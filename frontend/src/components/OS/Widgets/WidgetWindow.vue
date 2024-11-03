<script lang="ts" setup>
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import {ShortcutItem} from '@/enum/os'

const props = withDefaults(
  defineProps<{
    widget: ShortcutItem
  }>(),
  {},
)
const emit = defineEmits([])
const {text} = toRefs(props)
</script>

<template>
  <ViewPortWindow
    :init-win-options="widget.winOptions"
    :wid="widget.appid"
    class="widget-window"
    no-title-bar
    visible
    :allow-snap="false"
    :show-close="false"
    :allow-out="false"
    :alignWhenViewPortResize="'end'"
  >
    <component :is="widget.component"></component>
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
  transition:
    box-shadow 0.3s,
    border-color 0.3s;

  &:not(&:hover) {
    transition:
      box-shadow 0.6s,
      border-color 0.6s;
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
