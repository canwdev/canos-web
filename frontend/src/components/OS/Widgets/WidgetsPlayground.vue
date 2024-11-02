<script lang="ts" setup="">
import ScreenClock from '@/apps/widgets/ScreenClock/index.vue'
import WidgetWindow from '@/components/OS/Widgets/WidgetWindow.vue'

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
  <div class="desktop-widgets">
    <WidgetWindow>
      <ScreenClock />
    </WidgetWindow>
  </div>
</template>

<style lang="scss" scoped>
.desktop-widgets {
  height: calc(100% - $taskbar_height);
  width: 100%;
  position: absolute;
  top: 0;
  //background-color: rgba(255, 192, 203, 0.66);
  pointer-events: none;
}
</style>
