<script lang="ts" setup>
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'

const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: '',
  },
)
const emit = defineEmits([])
const {text} = toRefs(props)
</script>

<template>
  <ViewPortWindow
    :init-win-options="{
      width: '200px',
      height: '200px',
    }"
    class="widget-window"
    no-title-bar
    visible
    :allow-snap="false"
    :show-close="false"
  >
    <slot></slot>
  </ViewPortWindow>
</template>

<style lang="scss" scoped>
.widget-window {
  pointer-events: auto;
  touch-action: none;
  user-select: none;
  transform: translate(0px, 0px);
  box-sizing: border-box;
  background-color: transparent !important;
  min-width: 100px;
  min-height: 100px;
  transition: all 0.3s;

  &:not(&:hover) {
    transition: all 0.6s;
    border-color: transparent !important;
    box-shadow: none !important;
    outline: none !important;
  }

  :deep(.vp-window-title-bar) {
    //display: none;
  }
  :deep(.vp-window-body) {
    background-color: transparent !important;
  }
}
</style>
