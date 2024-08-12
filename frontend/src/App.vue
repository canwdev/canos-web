<script lang="ts" setup>
import {useGlobalTheme} from '@/hooks/use-global-theme'
import AppSub from '@/AppSub.vue'
import {useSettingsStore} from '@/store/settings'

const {isAppDarkMode} = useGlobalTheme()
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="page-root">
    <RouterView />
    <AppSub />
  </div>
</template>

<style lang="scss">
#app {
  .vp-window._maximized {
    bottom: $taskbar_height !important;
    height: calc(100% - $taskbar_height) !important;
  }
}
.page-root {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f8f8f8;
}
._dark {
  .page-root {
    background-color: #303030;
    //background-image: linear-gradient(#434343, #282828);
    color: white;
  }
}
</style>
