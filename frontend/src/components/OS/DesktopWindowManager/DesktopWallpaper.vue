<script lang="ts">
import {defineComponent} from 'vue'
import {useSettingsStore} from '@/store/settings'

export default defineComponent({
  name: 'DesktopWallpaper',
  setup() {
    const settingsStore = useSettingsStore()

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
    }
  },
})
</script>

<template>
  <div class="desktop-wallpaper" :style="bgStyle">
    <slot></slot>
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
}
</style>
