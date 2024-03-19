<script lang="ts" setup>
import {useVModel} from '@vueuse/core'

export interface ILayout {
  xRatio: number
  yRatio: number
  widthRatio: number
  heightRatio: number
}

const emit = defineEmits(['setWindowLayout'])
interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

const mVisible = useVModel(props, 'visible', emit)

const layoutList: ILayout[] = [
  // 3个一组
  {xRatio: 0, yRatio: 0, widthRatio: 0.5, heightRatio: 0.5},
  {xRatio: 0, yRatio: 0, widthRatio: 1, heightRatio: 0.5},
  {xRatio: 0.5, yRatio: 0, widthRatio: 0.5, heightRatio: 0.5},
  //
  {xRatio: 0, yRatio: 0, widthRatio: 0.5, heightRatio: 1},
  {xRatio: 0.1, yRatio: 0.1, widthRatio: 0.8, heightRatio: 0.8},
  {xRatio: 0.5, yRatio: 0, widthRatio: 0.5, heightRatio: 1},
  //
  {xRatio: 0, yRatio: 0.5, widthRatio: 0.5, heightRatio: 0.5},
  {xRatio: 0, yRatio: 0.5, widthRatio: 1, heightRatio: 0.5},
  {xRatio: 0.5, yRatio: 0.5, widthRatio: 0.5, heightRatio: 0.5},
  //
  {xRatio: 0, yRatio: 0, widthRatio: 0.3333, heightRatio: 1},
  {xRatio: 0.3333, yRatio: 0, widthRatio: 0.3333, heightRatio: 1},
  {xRatio: 0.6666, yRatio: 0, widthRatio: 0.3333, heightRatio: 1},
  //
  {xRatio: 0, yRatio: 0, widthRatio: 0.6666, heightRatio: 1},
  {xRatio: 0, yRatio: 0, widthRatio: 1, heightRatio: 1},
  {xRatio: 0.3333, yRatio: 0, widthRatio: 0.6666, heightRatio: 1},
]

const layoutPreview = ref<null | ILayout>(null)

const setWindowLayout = (layout: ILayout) => {
  const {xRatio, yRatio, widthRatio, heightRatio} = layout
  const {innerWidth: maxWidth, innerHeight: maxHeight} = window
  const left = Math.ceil(maxWidth * xRatio)
  const top = Math.ceil(maxHeight * yRatio)
  const width = Math.ceil(maxWidth * widthRatio)
  const height = Math.ceil(maxHeight * heightRatio)

  emit('setWindowLayout', {
    left,
    top,
    width,
    height,
  })
  mVisible.value = false
  layoutPreview.value = null
}
</script>

<template>
  <transition name="mc-fade">
    <div v-if="mVisible" @mouseleave="mVisible = false" class="vp-layout-helper vp-panel">
      <div
        v-for="(layout, index) in layoutList"
        :key="LayoutHelper"
        class="layout-item"
        @mouseover="layoutPreview = layout"
        @mouseleave="layoutPreview = null"
        @click="setWindowLayout(layout)"
      >
        <div
          :style="{
            top: `${layout.yRatio * 100}%`,
            left: `${layout.xRatio * 100}%`,
            width: `${layout.widthRatio * 100}%`,
            height: `${layout.heightRatio * 100}%`,
          }"
          class="layout-inner"
        ></div>
      </div>
    </div>
  </transition>
  <transition name="mc-fade-scale">
    <div
      v-if="layoutPreview"
      class="vp-demo-layout"
      :style="{
        top: `${layoutPreview.yRatio * 100}%`,
        left: `${layoutPreview.xRatio * 100}%`,
        width: `${layoutPreview.widthRatio * 100}%`,
        height: `${layoutPreview.heightRatio * 100}%`,
      }"
    ></div>
  </transition>
</template>

<style lang="scss" scoped>
.vp-layout-helper {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 4px;
  padding: 4px;
  z-index: 200;

  .layout-item {
    position: relative;
    width: 40px;
    height: 25px;
    background-color: $primary_opacity;
    cursor: pointer;
    filter: grayscale(1);
    opacity: 0.4;
    transition: all 0.3s;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
    .layout-inner {
      position: absolute;
      background-color: $primary;
      pointer-events: none;
    }
  }
}
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
