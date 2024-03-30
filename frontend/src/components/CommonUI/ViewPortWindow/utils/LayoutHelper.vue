<script lang="ts" setup>
import {useVModel} from '@vueuse/core'
import {ILayout, layoutList} from '../enum'
import LayoutPreview from './LayoutPreview.vue'

const emit = defineEmits(['update:visible', 'setWindowLayout'])
interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})

const mVisible = useVModel(props, 'visible', emit)

const previewData = ref<ILayout>()

const setWindowLayout = (layout: ILayout) => {
  emit('setWindowLayout', layout)
  mVisible.value = false
  setTimeout(() => {
    previewData.value = undefined
  })
}

const setLayout = (layout: ILayout) => {
  if (mVisible.value) {
    previewData.value = layout
  } else {
    previewData.value = undefined
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="mVisible" @mouseleave="mVisible = false" class="vp-layout-helper vp-panel">
      <div
        v-for="(layout, index) in layoutList"
        :key="index"
        class="layout-item"
        @mouseover="setLayout(layout)"
        @mouseleave="previewData = undefined"
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
  <LayoutPreview :preview-data="previewData" />
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
</style>
