<script lang="ts">
export default {
  name: 'ScreenClock',
}
</script>

<script lang="ts" setup>
import AnalogClock from '@/apps/widgets/ScreenClock/AnalogClock.vue'
import DigitalClock from '@/apps/widgets/ScreenClock/DigitalClock.vue'
import {useFullscreen, useStorage, useWakeLock} from '@vueuse/core'
import {useCursorHider} from '@/hooks/use-cursor'

const rootRef = ref()
const isDigital = useStorage('canos_clock_is_digital', false)
const darkText = useStorage('canos_clock_is_dark_text', false)
const {isFullscreen, toggle: toggleFullScreen} = useFullscreen(rootRef)

const {isSupported, isActive, request, release} = useWakeLock()
watch(isFullscreen, (val) => {
  if (isSupported.value) {
    if (val) {
      request()
    } else {
      release()
    }
  }
})
onBeforeMount(() => {
  release()
})

const isShowFloatBar = ref(false)
useCursorHider(rootRef, ({el, isShow}) => {
  isShowFloatBar.value = isShow
  if (isFullscreen.value) {
    if (!isShow) {
      el.style.cursor = 'none'
    } else {
      el.style.cursor = ''
    }
  }
})
</script>

<template>
  <div ref="rootRef" class="screen-clock" :class="{isFullscreen, darkText}">
    <transition name="fade">
      <div v-show="isShowFloatBar" class="float-bar">
        <button class="btn-no-style" disabled v-if="isActive" title="Wakelock active">
          <span class="mdi mdi-coffee"></span>
        </button>
        <button class="btn-no-style" title="Toggle Clock" @click="isDigital = !isDigital">
          <span v-if="isDigital" class="mdi mdi-toggle-switch"></span>
          <span v-else class="mdi mdi-toggle-switch-off"></span>
        </button>
        <button class="btn-no-style" title="Dark Text" @click="darkText = !darkText">
          <span v-if="!darkText" class="mdi mdi-brightness-4"></span>
          <span v-else class="mdi mdi-brightness-7"></span>
        </button>
        <button class="btn-no-style" title="Fullscreen" @click="toggleFullScreen">
          <span v-if="!isFullscreen" class="mdi mdi-fullscreen"></span>
          <span v-else class="mdi mdi-fullscreen-exit"></span>
        </button>
      </div>
    </transition>

    <DigitalClock v-if="isDigital" />
    <AnalogClock v-else />
  </div>
</template>

<style lang="scss" scoped>
.screen-clock {
  height: 100%;
  width: 100%;
  position: relative;
  color: white;
  transition: all 2s;

  .digital-clock-wrapper {
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.9);
  }

  &.darkText {
    color: black;
    .digital-clock-wrapper {
      text-shadow: none;
    }
  }
  @keyframes brightnessAnimation {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  &.isFullscreen {
    background-color: black;
    color: white;

    &.darkText {
      background-color: white;
      color: black;
    }

    &:not(&.darkText) {
      // oled 防止烧屏
      animation: brightnessAnimation 10s infinite linear alternate;
    }
  }

  .float-bar {
    position: absolute;
    bottom: 2px;
    right: 2px;
    z-index: 10;
    display: flex;
    gap: 4px;
    align-items: center;

    button {
      line-height: 1;
      font-size: 16px;
      opacity: 0.5;
    }

    &:hover {
      display: flex !important;
    }
  }
}
</style>
