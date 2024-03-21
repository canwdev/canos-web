<script setup lang="ts">
import {formatTimeHMS} from '@/utils'
import CoverMini from '@/apps/MusicPlayer/CoverMini.vue'
import TkSeekbar from '@/components/CommonUI/TkSeekBar.vue'
import Mousetrap from 'mousetrap'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'
import {useI18n} from 'vue-i18n'
import {
  loopModeMap,
  LoopModeTypeValues,
  useMusicSettingsStore,
  useMusicStore,
} from '@/apps/MusicPlayer/utils/music-state'
import {
  PlayCircle20Regular,
  PauseCircle20Regular,
  Previous20Filled,
  Next20Filled,
  Speaker220Filled,
  SpeakerOff20Regular,
} from '@vicons/fluent'

// interface Props {}
// const props = withDefaults(defineProps<Props>(), {})

const musicStore = useMusicStore()

const KEY_SPACE = 'space'
const KEY_PREVIOUS = ['left', 'pageup', 'k', 'l']
const KEY_NEXT = ['right', 'pagedown', 'h', 'j']
const KEY_UP = 'up'
const KEY_DOWN = 'down'

const emit = defineEmits(['onCoverClick', 'onTitleClick'])

const {t: $t} = useI18n()
const mSettingsStore = useMusicSettingsStore()
const mCurrentTime = ref(0)
const isSeeking = ref(false)
const isDisabled = ref(false)

const mousetrapRef = shallowRef()

const togglePlay = (e) => {
  e.preventDefault()
  musicBus.emit(MusicEvents.ACTION_TOGGLE_PLAY)
}
const previous = () => {
  musicStore.playPrev()
}
const next = () => {
  musicStore.playNext()
}
const volumeUpFn = (e) => {
  e.preventDefault()
  mSettingsStore.volumeUp()
}
const volumeDownFn = (e) => {
  e.preventDefault()
  mSettingsStore.volumeDown()
}
const switchLoopMode = () => {
  let index = LoopModeTypeValues.findIndex((i) => i === mSettingsStore.loopMode)
  ++index
  if (index > LoopModeTypeValues.length - 1) {
    index = 0
  }
  if (LoopModeTypeValues[index]) {
    mSettingsStore.loopMode = LoopModeTypeValues[index]
    window.$message.info($t(currentLoopMode.value.i18nKey))
  }
}

const progressSeeking = (value) => {
  isSeeking.value = true
  mCurrentTime.value = Number(value)
}
const progressChange = (value) => {
  value = Number(value)
  musicBus.emit(MusicEvents.ACTION_CHANGE_CURRENT_TIME, value)
  isSeeking.value = false
}

const currentLoopMode = computed(() => {
  return loopModeMap[mSettingsStore.loopMode]
})

onMounted(() => {
  const mousetrap = new Mousetrap()
  mousetrap.bind(KEY_SPACE, togglePlay)
  mousetrap.bind(KEY_PREVIOUS, previous)
  mousetrap.bind(KEY_NEXT, next)
  mousetrap.bind('ctrl+x', switchLoopMode)
  mousetrap.bind(KEY_UP, volumeUpFn)
  mousetrap.bind(KEY_DOWN, volumeDownFn)

  mousetrapRef.value = mousetrap
})

onBeforeUnmount(() => {
  if (mousetrapRef.value) {
    mousetrapRef.value.reset()
  }
})

watch(
  () => musicStore.currentTime,
  (val) => {
    if (!isSeeking.value) {
      mCurrentTime.value = val
    }
  },
)

const musicItem = computed(() => musicStore.musicItem)
</script>

<template>
  <div v-if="musicItem" class="actionbar-wrapper">
    <div class="progressbar">
      <span class="time text-overflow">{{ formatTimeHMS(mCurrentTime) }}</span>

      <TkSeekbar
        :max="musicStore.duration"
        :value="mCurrentTime"
        @input="progressSeeking"
        @change="progressChange"
      />

      <span class="time text-overflow">{{ formatTimeHMS(musicStore.duration) }}</span>
    </div>
    <div class="actionbar">
      <CoverMini :src="musicItem.cover" icon-name="audiotrack" @click="$emit('onCoverClick')" />
      <button class="btn-song-info btn-no-style" @click="$emit('onTitleClick')">
        <span class="title text-overflow">{{ musicItem.titleDisplay }}</span>
        <span v-show="musicItem.artist" class="artist text-overflow">{{ musicItem.artist }}</span>
        <span v-show="musicItem.album" class="album text-overflow">{{ musicItem.album }}</span>
      </button>
      <div class="buttons-scroll">
        <button
          :disabled="isDisabled"
          class="btn-action btn-no-style"
          :title="$t('previous')"
          @click="previous"
        >
          <i class="icon-wrap"><Previous20Filled /></i>
        </button>

        <button
          :disabled="isDisabled"
          class="btn-action btn-no-style"
          :title="musicStore.paused ? $t('play') : $t('pause')"
          @click="togglePlay"
        >
          <i class="icon-wrap _lg">
            <PlayCircle20Regular v-if="musicStore.paused" />
            <PauseCircle20Regular v-else />
          </i>
        </button>

        <button
          :disabled="isDisabled"
          class="btn-action btn-no-style"
          :title="$t('next')"
          @click="next"
        >
          <i class="icon-wrap"><Next20Filled /></i>
        </button>

        <button
          v-if="currentLoopMode"
          class="btn-action btn-no-style"
          :title="$t(currentLoopMode.i18nKey)"
          @click="switchLoopMode"
        >
          <i class="icon-wrap" :class="currentLoopMode.className">
            <component v-if="currentLoopMode.icon" :is="currentLoopMode.icon"></component>
            <span v-else>{{ $t(currentLoopMode.i18nKey) }}</span>
          </i>
        </button>

        <n-popover placement="top" trigger="click">
          <template #trigger>
            <button class="btn-action btn-no-style" :title="$t('volume')">
              <i class="icon-wrap">
                <Speaker220Filled v-if="mSettingsStore.audioVolume > 0" />
                <SpeakerOff20Regular v-else />
              </i>
            </button>
          </template>
          <div style="display: flex; align-items: center; flex-direction: column">
            <n-slider
              vertical
              style="height: 100px"
              :max="100"
              :tooltip="false"
              v-model:value="mSettingsStore.audioVolume"
            />
            <span style="font-size: 12px">{{ mSettingsStore.audioVolume }}</span>
          </div>
        </n-popover>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actionbar-wrapper {
  width: 100%;
  $bottomZIndex: 2100;

  .icon-wrap {
    svg {
      width: 20px;
      height: 20px;
    }
    &._lg {
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }

  .progressbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25px;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid $color_border;
    border-bottom: 1px solid $color_border;
    position: relative;
    z-index: $bottomZIndex;

    .time {
      font-size: 12px;
      width: 62px;
      text-align: center;
    }
  }

  .actionbar {
    display: flex;
    align-items: center;
    height: 50px;
    user-select: none;
    position: relative;
    z-index: $bottomZIndex;

    button {
      border-radius: 0;
    }

    .btn-cover {
      border-radius: 0;
      flex-shrink: 0;
    }

    .btn-song-info {
      height: 100%;
      border-right: 1px solid $color_border;
      text-align: left;
      padding-left: 5px;
      line-height: 1.1;
      flex: 1;
      overflow-x: auto;

      .title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 2px;
      }

      .artist,
      .album {
        font-size: 10px;
        font-weight: 400;
      }

      & > span {
        display: block;
        width: 100%;
      }
    }

    .buttons-scroll {
      overflow: auto;
      height: 100%;
      flex-wrap: nowrap;
      display: flex;
      align-items: center;

      & > button {
        height: 100%;
        width: 55px;
        flex-shrink: 0;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        .reverse-x {
          text-shadow: 0 0 5px red;
          color: red;
          transform: rotateX(-180deg);
        }

        &.active {
          color: $primary;
        }

        & + button {
          border-left: 1px solid $color_border;
        }
      }
    }
  }
}
</style>
