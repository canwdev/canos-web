<script lang="ts" setup>
import AnalogClock from '@/apps/AppUtils/ScreenClock/AnalogClock.vue'
import DigitalClock from '@/apps/AppUtils/ScreenClock/DigitalClock.vue'
import {useFullscreen, useStorage} from '@vueuse/core'

const rootRef = ref()
const isDigital = useStorage('is_digital_clock', false)
const {isFullscreen, toggle: toggleFullScreen} = useFullscreen(rootRef)
</script>

<template>
  <div ref="rootRef" class="screen-clock" :class="{isFullscreen}">
    <div class="float-bar">
      <button title="Fullscreen" @click="toggleFullScreen">⌗</button>
      <button title="Toggle" @click="isDigital = !isDigital">✱</button>
    </div>

    <DigitalClock v-if="isDigital" />
    <AnalogClock v-else />
  </div>
</template>

<style lang="scss" scoped>
.screen-clock {
  height: 100%;
  width: 100%;
  background-image: url('./bg.svg');
  position: relative;

  &.isFullscreen {
    background-color: black;
    color: white;
  }

  .float-bar {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;

    button {
      background: transparent;
      border: none;
      outline: none;
      font-size: 20px;
      color: inherit;
      cursor: pointer;
      opacity: 0.5;

      &:active {
        opacity: 1;
      }
    }
  }
}
</style>
