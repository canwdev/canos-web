<script lang="ts">
import {computed, defineComponent, onBeforeUnmount, onMounted, ref, shallowRef, watch} from 'vue'
import PianoKey from './PianoKey.vue'
import {getAudioBuffer} from './utils'
import {pianoNoteTable} from './utils/notes'
import {ControlKeys, MainKeyboardKeys, ToneTypesOptions, PianoConstant, KeyType} from './enum'
import {useLocalStorageNumber, useLocalStorageString} from '@/hooks/use-local-storage'

export default defineComponent({
  name: 'App',
  components: {
    PianoKey,
  },
  setup() {
    const rootRef = ref()
    const miniKeyboardRef = ref()
    const miniKeyboardOctavesRef = ref([])

    const gainNode = shallowRef()
    const audioContext = shallowRef()
    const audioAnalyser = shallowRef()

    // 初始音频偏移量
    const keyOffset = useLocalStorageNumber('KEY_OFFSET', 52)
    const keyToneList = ref<any[]>([])
    const playingTone = ref<any[]>([])
    // 维护按下PC键盘按键的数组
    const keyPressedPC = ref<string[]>([])
    const loadingCount = ref(0)
    const stopToneTimeout = ref()

    const volume = useLocalStorageNumber('VOLUME', 1)
    const selectedToneType = useLocalStorageString('selectedToneType', 'sine')

    watch(volume, (val) => {
      // 设置音量
      gainNode.value.gain.value = val.toFixed(1)
    })
    const updateKeyOffsetPos = () => {
      // 滚动到相应八度
      const octaveEl: any = miniKeyboardOctavesRef.value[octave.value]
      //.scrollIntoView({ block: 'end',  behavior: 'smooth' })

      if (!octaveEl) {
        return
      }

      miniKeyboardRef.value.scrollTo({
        left: octaveEl.offsetLeft - 50,
        behavior: 'smooth', // instant
      })
    }
    watch(keyOffset, () => {
      updateKeyOffsetPos()
    })
    watch(selectedToneType, (val) => {
      localStorage.setItem('selectedToneType', val)

      destroyPiano()
      initPiano()
    })
    // 音频素材是MP3或是使用createOscillator生成
    const toneSourceTypeMP3 = computed(() => {
      return ToneTypesOptions.filter((v) => v.value === selectedToneType.value)[0].isMP3 || false
    })

    const initPiano = async () => {
      const AudioContext =
        window.AudioContext || // Default
        // @ts-ignore
        window.webkitAudioContext || // Safari and old versions of Chrome
        false

      if (!AudioContext) {
        alert('您的浏览器不支持 Web Audio API，程序无法正常运作')
      }

      // 创建音频上下文对象
      audioContext.value = new AudioContext()
      // 创建增益节点，它可以控制音频的总音量
      gainNode.value = audioContext.value.createGain()
      // 设置初始音量
      gainNode.value.gain.value = volume.value
      // 钢琴键盘音源列表，从1开始，一共有88个
      keyToneList.value = []
      // 维护正在播放音调的列表，用于控制短按
      playingTone.value = []
      stopToneTimeout.value = null

      // 创建化可视化分析器节点（此节点直接连接到音频出口）
      audioAnalyser.value = audioContext.value.createAnalyser()
      // 通过管道（connect）把节点和出口（destination）连接
      audioAnalyser.value.connect(audioContext.value.destination)

      // 获取所有音频
      if (toneSourceTypeMP3.value) {
        // 加载MP3数据为buffer
        for (let i = 1; i <= PianoConstant.KEY_COUNT; i++) {
          keyToneList.value[i] = await getAudioBuffer(
            audioContext.value,
            `${import.meta.env.BASE_URL}tones/${selectedToneType.value}/${i}.mp3`
          ).catch((e) => {
            console.error(e)
          })
          loadingCount.value = i
        }
      } else {
        // 加载pianoNoteTable
        let number = 1
        pianoNoteTable.forEach((i) => {
          const t = Object.entries(i)
          t.forEach(([key, value]) => {
            keyToneList.value[number] = value
            loadingCount.value = number
            number++
          })
        })
      }

      window.addEventListener('keydown', handlePCKeyboard)
      window.addEventListener('keyup', handlePCKeyboard)
      updateKeyOffsetPos()
    }
    const destroyPiano = () => {
      window.removeEventListener('keydown', handlePCKeyboard)
      window.removeEventListener('keyup', handlePCKeyboard)
      audioContext.value = null
    }

    const playTone = (data, name) => {
      clearTimeout(stopToneTimeout.value)
      // 由于 AudioBufferSourceNode.start() 只能使用一次，所以每次播放时都要重新创建
      let src: any = null
      const actx = audioContext.value

      if (toneSourceTypeMP3.value) {
        src = actx.createBufferSource()
        src.buffer = data
      } else {
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        src = actx.createOscillator()
        // 指定音调的类型，其他还有 sine|square|sawtooth|triangle 等
        src.type = selectedToneType.value
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        src.frequency.value = data
      }

      // 创建当前音调的增益节点，用于 stopTone 淡出效果
      const currentGain = actx.createGain()
      src.connect(currentGain)

      if (!toneSourceTypeMP3.value) {
        // 仅为生成的波形制造淡入淡出效果
        // 第0秒时音量为0（下面这行需要注释，否则 Firefox 会报错）
        // currentGain.gain.setValueAtTime(0, actx.currentTime)
        // 淡入
        currentGain.gain.exponentialRampToValueAtTime(1, actx.currentTime)
        // 1.5秒内声音慢慢降低，淡出
        currentGain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 1.5)
      }

      // 连接总增益节点
      currentGain.connect(gainNode.value)
      // 连接可视化分析节点
      gainNode.value.connect(audioAnalyser.value)
      // 音频流出
      src.start(actx.currentTime)

      // 维护正在播放的列表
      playingTone.value[name] = {audio: src, gainNode: currentGain}
      return src
    }

    const stopTone = (name) => {
      // 停止播放
      clearTimeout(stopToneTimeout.value)

      const tone = playingTone.value[name]

      if (tone) {
        // TODO: 延音踏板 TAB
        // 淡出效果
        tone.gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.value.currentTime + 1)
        stopToneTimeout.value = setTimeout(() => {
          tone.audio.stop()
          playingTone.value[name] = null
        }, 1000)
      } else {
        console.warn('stopTone: named tone not exist: ' + name)
      }
    }

    const handleMiniKeyboardPress = (index) => {
      const data = keyToneList.value[index]

      if (data) {
        playTone(data, index)
      } else {
        console.warn('handleMiniKeyboardPress: index tone not exist: ' + index)
      }
    }

    const handleMainKeyboardPress = (index) => {
      let toneIndex = index + keyOffset.value
      const data = keyToneList.value[toneIndex]
      if (data) {
        playTone(data, index)
      } else {
        console.warn(
          '[handleMainKeyboardPress]: index tone not exist: ' + toneIndex + ', The name is ' + index
        )
      }
    }
    const handlePCKeyboard = (evt) => {
      const key = evt.key.toUpperCase()

      // 遍历键盘数组
      const i = MainKeyboardKeys.findIndex((v) => {
        return v.label === key
      })
      // 遍历功能键数组
      const fnI = ControlKeys.findIndex((v) => {
        return v.label === key
      })

      if (i !== -1 || fnI !== -1) {
        // 处理功能键及键按下状态
        const ki = keyPressedPC.value.indexOf(key) // 是否在按下的列表中

        if (evt.type === 'keydown') {
          // 增加这个按键
          if (ki === -1) {
            keyPressedPC.value.push(key)
            // console.log(keyPressedPC.value)
          } else {
            // 防止重复触发(重要！)
            return
          }
          // console.log(key, i)
        } else {
          // keyup
          // 移除按键
          if (ki !== -1) {
            keyPressedPC.value.splice(ki, 1)
          }
        }
      }

      if (i !== -1) {
        // 仅处理声音播放
        if (evt.type === 'keydown') {
          handleMainKeyboardPress(i)
        } else {
          stopTone(i)
        }
      }

      if (fnI !== -1 && evt.type === 'keyup') {
        // 仅处理功能键
        setSettings(key)
      }
    }
    const setSettings = (keyLabel) => {
      // 调整设置
      switch (keyLabel) {
        case 'Z':
          keyOffset.value = Math.max(4, keyOffset.value - PianoConstant.SEMITONE)
          break
        case 'X':
          keyOffset.value = Math.min(76, keyOffset.value + PianoConstant.SEMITONE)
          break
        case 'C':
          volume.value = Math.max(0, volume.value - 0.1)
          break
        case 'V':
          volume.value = Math.min(1, volume.value + 0.1)
          break
      }
      if (/[1-9]/.test(keyLabel)) {
        // 直接跳转相应的八度音程
        keyOffset.value = (Number(keyLabel) - 1) * PianoConstant.SEMITONE + 4
      }
    }

    onMounted(async () => {
      const isTouch = 'ontouchstart' in window
      if (isTouch) {
        alert('请使用鼠标或键盘输入')
      }

      await initPiano()
    })
    onBeforeUnmount(() => {
      destroyPiano()
    })

    // 八度音程表示
    const octave = computed(() => {
      return Math.floor(keyOffset.value / PianoConstant.SEMITONE) + 1
    })

    // 生成mini按键列表
    const miniKeys = computed(() => {
      type InnerItem = {
        label: string
        value: any
        realIndex: number
      }

      let realIndex = 0
      let ret: InnerItem[][] = []
      for (let i = 0; i < pianoNoteTable.length; i++) {
        const group = Object.entries(pianoNoteTable[i])
        let list: InnerItem[] = []
        for (let j = 0; j < group.length; j++) {
          const [key, value] = group[j]
          list.push({
            label: key,
            value,
            realIndex,
          })
          realIndex++
        }
        ret.push(list)
      }

      return ret
    })

    return {
      rootRef,
      miniKeyboardRef,
      miniKeyboardOctavesRef,
      PianoConstant,
      KeyType,
      ToneTypesOptions,
      pianoNoteTable,
      MainKeyboardKeys,
      ControlKeys,
      loadingCount,
      keyOffset,
      keyPressedPC,
      octave,
      handleMainKeyboardPress,
      selectedToneType,
      volume,
      handleMiniKeyboardPress,
      stopTone,
      setSettings,
      miniKeys,
    }
  },
})
</script>

<template>
  <div ref="rootRef" class="piano-js-wrap">
    <div v-show="loadingCount + 1 <= PianoConstant.KEY_COUNT" class="piano-loading">
      <p>加载音频素材 {{ loadingCount }}/{{ PianoConstant.KEY_COUNT }}</p>
    </div>
    <div class="piano-body">
      <div class="info-wrap">
        <div>
          <div class="desc">音量: {{ Number(volume.toFixed(2)) * 100 }}%</div>
          <div class="desc">偏移: {{ keyOffset }} / {{ PianoConstant.KEY_COUNT }}</div>
          <div class="desc pro">八度音程: C{{ octave }}</div>
          <div class="desc pro2" v-show="keyPressedPC.length > 0">
            按下: {{ keyPressedPC.join(' ') }}
          </div>
        </div>

        <div class="desc pro3">
          音色：
          <select v-model="selectedToneType">
            <option
              v-for="(v, i) in ToneTypesOptions"
              :key="i"
              :value="v.value"
              :disabled="v.isMP3"
            >
              {{ v.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="mini-keyboard-wrap" ref="miniKeyboardRef">
        <div
          ref="miniKeyboardOctavesRef"
          v-for="(group, gIndex) in miniKeys"
          :key="gIndex"
          class="octave"
          :class="{active: gIndex === octave}"
        >
          <PianoKey
            small
            v-for="(item, subIndex) in group"
            :key="subIndex"
            :label="item.label"
            :extra-label="gIndex.toString()"
            :key-type="item.label.length === 1 ? KeyType.WHITE : KeyType.BLACK"
            @onPress="handleMiniKeyboardPress(item.realIndex + 1)"
            @onRelease="stopTone(item.realIndex + 1)"
          />
        </div>
      </div>

      <div class="main-keyboard-wrap">
        <PianoKey
          v-for="(v, i) in MainKeyboardKeys"
          :key="i"
          :label="v.label"
          :key-type="v.type"
          :active="keyPressedPC.indexOf(v.label) !== -1"
          @onPress="handleMainKeyboardPress(i)"
          @onRelease="stopTone(i)"
        />
      </div>

      <div class="control-wrap">
        <PianoKey
          v-for="(v, i) in ControlKeys"
          :key="i"
          :label="v.label"
          :key-type="v.type"
          :extra-label="v.extraLabel"
          :active="keyPressedPC.indexOf(v.label) !== -1"
          @onPress="setSettings(v.label)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color_blue: #2eb1d0;
$color_purple: #af55d7;
$color_green: #4dd584;
$color_yellow: #dfd565;
$color_orange: #e8a44a;
$color_grey: #607d8b;
$window_radius: 8px;
$key_color_border: #898989;

.piano-js-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .piano-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .piano-body {
    width: 100%;
    min-width: 620px;
    padding: 50px;
    margin: 0 auto;
    user-select: none;
    border-radius: $window_radius;
    box-sizing: border-box;

    .info-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .desc {
        display: inline-block;
        padding: 3px 5px;
        background: $color_blue;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;

        select {
          background: $color_grey;
          color: #fff;
          border: none;
          border-radius: 3px;
          padding: 0;
        }

        &.pro {
          background: $color_purple;
        }

        &.pro2 {
          background: $color_green;
        }

        &.pro3 {
          background: $color_grey;
        }

        & + .desc {
          margin-left: 5px;
        }
      }
    }

    .key + .key {
      margin-left: 2px;
    }

    .main-keyboard-wrap {
      margin: 0 auto;
      width: fit-content;
      position: relative;
    }

    .control-wrap {
      margin-top: 2px;
      padding-left: 25px;

      .key:nth-child(1),
      .key:nth-child(2) {
        background: $color_yellow;

        &:active,
        &.pressed {
          background: darken($color_yellow, 10);
        }
      }

      .key:nth-child(3),
      .key:nth-child(4) {
        background: $color_orange;

        &:active,
        &.pressed {
          background: darken($color_orange, 10);
        }
      }
    }

    .mini-keyboard-wrap {
      margin-top: 10px;
      margin-bottom: 10px;
      width: auto;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;

      .octave {
        max-width: 224px; // fix Safari
        display: inline-block;
        border: 1px solid transparent;
        border-radius: 3px;
        overflow: hidden;

        & + .octave {
          margin-left: 4px;
        }

        &.active {
          border-color: $color_purple;
        }
      }
    }
  }
}
</style>
