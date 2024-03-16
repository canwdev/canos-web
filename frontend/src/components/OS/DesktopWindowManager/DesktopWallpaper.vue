<script lang="ts">
import {defineComponent} from 'vue'
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'

export default defineComponent({
  name: 'DesktopWallpaper',
  setup() {
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()

    const bgStyle = computed(() => {
      const s: any = {}
      if (settingsStore.desktopWallpaper) {
        s.backgroundImage = `url(${settingsStore.desktopWallpaper})`
      }
      if (settingsStore.desktopBgColor) {
        s.backgroundColor = settingsStore.desktopBgColor
      }
      return s
    })

    return {
      bgStyle,
      systemStore,
    }
  },
})
</script>

<template>
  <div class="desktop-wallpaper" :style="bgStyle">
    <slot></slot>

    <span class="watermark-tip font-code">{{
      `${!systemStore.isBackendAvailable ? '服务器离线模式' : '开发模式'}`
    }}</span>
  </div>
</template>

<style lang="scss" scoped>
.desktop-wallpaper {
  //background-color: #3a6ea5;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.7);

  .watermark-tip {
    position: absolute;
    bottom: 38px;
    right: 8px;
    text-shadow: none;
    white-space: break-spaces;
    text-align: right;
  }
}
</style>
