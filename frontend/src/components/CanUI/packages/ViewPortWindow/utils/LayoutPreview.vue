<script lang="ts" setup>
import {ILayout} from '../enum'
interface Props {
  previewData: ILayout | undefined
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <transition name="fade-scale">
    <div
      v-if="previewData"
      class="vp-demo-layout"
      :style="{
        top: `${previewData.yRatio * 100}%`,
        left: `${previewData.xRatio * 100}%`,
        width: `${previewData.widthRatio * 100}%`,
        height: `${previewData.heightRatio * 100}%`,
      }"
    ></div>
  </transition>
</template>

<style lang="scss" scoped>
.vp-demo-layout {
  position: fixed;
  z-index: 1000;
  background-color: $primary_opacity;
  border: 2px solid $primary;
  pointer-events: none;
  box-sizing: border-box;
  transition: all 0.3s;
}
</style>
