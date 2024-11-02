<script lang="ts" setup>
import WidgetWindow from '@/components/OS/Widgets/WidgetWindow.vue'
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'

// const props = withDefaults(
//   defineProps<{
//     text?: string
//   }>(),
//   {
//     text: '',
//   },
// )
// const emit = defineEmits([])
// const {text} = toRefs(props)

const settingsStore = useSettingsStore()
const systemStore = useSystemStore()
</script>

<template>
  <div class="desktop-widgets" v-if="settingsStore.enabledWidgetIds.length">
    <template v-for="id in settingsStore.enabledWidgetIds" :key="id">
      <WidgetWindow
        v-if="systemStore.allWidgetAppidMap[id]"
        :widget="systemStore.allWidgetAppidMap[id]"
      >
      </WidgetWindow>
    </template>
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
