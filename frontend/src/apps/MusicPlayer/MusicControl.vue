<script setup lang="ts">
import {formatTimeHMS} from '@/utils'
import CoverMini from '@/apps/MusicPlayer/CoverMini.vue'
import TkSeekbar from '@/components/TkSeekBar.vue'
import Mousetrap from 'mousetrap'
import musicBus, {MusicEvents} from '@/apps/MusicPlayer/utils/bus'
import {useI18n} from 'vue-i18n'
import {
  loopModeMap,
  LoopModeTypeValues,
  useMusicSettingsStore,
  useMediaStore,
} from '@/apps/MusicPlayer/utils/music-state'
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'

// interface Props {}
// const props = withDefaults(defineProps<Props>(), {})

const mediaStore = useMediaStore()

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
  mediaStore.playPrev()
}
const next = () => {
  mediaStore.playNext()
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
  () => mediaStore.currentTime,
  (val) => {
    if (!isSeeking.value) {
      mCurrentTime.value = val
    }
  },
)

const musicItem = computed(() => mediaStore.musicItem)

const jumpForward = () => {
  musicBus.emit(MusicEvents.ACTION_CHANGE_CURRENT_TIME, (mediaStore.currentTime += 5))
}
const jumpBackward = () => {
  musicBus.emit(MusicEvents.ACTION_CHANGE_CURRENT_TIME, (mediaStore.currentTime -= 5))
}
</script>

<template>
  <div v-if="musicItem" class="actionbar-wrapper">
    <div class="progressbar">
      <span class="time text-overflow">{{ formatTimeHMS(mCurrentTime) }}</span>

      <TkSeekbar
        :max="mediaStore.duration"
        :value="mCurrentTime"
        @input="progressSeeking"
        @change="progressChange"
      />

      <span class="time text-overflow">{{ formatTimeHMS(mediaStore.duration) }}</span>
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
          class="btn-action btn-no-style icon-wrap"
          :title="$t('previous')"
          @click="previous"
          @contextmenu.prevent="jumpBackward"
        >
          <i class="fa fa-step-backward" aria-hidden="true"></i>
        </button>

        <button
          :disabled="isDisabled"
          class="btn-action btn-no-style icon-wrap"
          :title="mediaStore.paused ? $t('play') : $t('pause')"
          @click="togglePlay"
        >
          <template v-if="mediaStore.paused">
            <i class="fa fa-play" aria-hidden="true"></i>
          </template>
          <template v-else>
            <i class="fa fa-pause" aria-hidden="true"></i>
          </template>
        </button>

        <button
          :disabled="isDisabled"
          class="btn-action btn-no-style icon-wrap"
          :title="$t('next')"
          @click="next"
          @contextmenu.prevent="jumpForward"
        >
          <i class="fa fa-step-forward" aria-hidden="true"></i>
        </button>

        <el-popover placement="top" trigger="click">
          <template #reference>
            <button class="btn-action btn-no-style icon-wrap" :title="$t('playback-speed')">
              {{ mediaStore.playbackRate }}x
            </button>
          </template>

          <div class="flex-row-center-gap">
            <button class="vp-button" @click="mediaStore.playbackRate = Number(1)">重置</button>
            <el-slider
              style="width: 150px"
              v-model="mediaStore.playbackRate"
              :max="2"
              :min="0.1"
              :step="0.1"
            />
          </div>
        </el-popover>

        <button
          v-if="currentLoopMode"
          class="btn-action btn-no-style icon-wrap"
          :title="$t(currentLoopMode.i18nKey)"
          @click="switchLoopMode"
        >
          <span
            v-if="currentLoopMode.icon"
            class="material-icons"
            :class="currentLoopMode.className"
          >
            {{ currentLoopMode.icon }}
          </span>
          <span v-else>{{ $t(currentLoopMode.i18nKey) }}</span>
        </button>

        <el-popover placement="top" trigger="click">
          <template #reference>
            <button class="btn-action btn-no-style icon-wrap" :title="$t('volume')">
              <template v-if="mSettingsStore.audioVolume > 0">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
              </template>
              <template v-else>
                <i class="fa fa-volume-off" aria-hidden="true"></i>
              </template>
            </button>
          </template>
          <div style="display: flex; align-items: center; flex-direction: column">
            <el-slider
              style="width: 100px"
              :max="100"
              :tooltip="false"
              v-model="mSettingsStore.audioVolume"
            />
            <span style="font-size: 12px">{{ mSettingsStore.audioVolume }}</span>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actionbar-wrapper {
  width: 100%;
  $bottomZIndex: 2100;

  .icon-wrap {
    font-size: 18px;
    &._lg {
      font-size: 28px;
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
