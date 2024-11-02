<script lang="ts" setup>
import {useGlobalTheme} from '@/hooks/use-global-theme'
import AppSub from '@/AppSub.vue'
import {useSettingsStore} from '@/store/settings'
import {useEventListener} from '@vueuse/core'
import {useMainStore} from '@/store/main'

const {isAppDarkMode} = useGlobalTheme()
const mainStore = useMainStore()
const settingsStore = useSettingsStore()

useEventListener(document, 'keydown', (event) => {
  const key = event.key.toLowerCase()
  const isCtrlOrMeta = event.ctrlKey || event.metaKey
  if (event.altKey && key === 'q') {
    mainStore.isShowStart = !mainStore.isShowStart
  }
})
</script>

<template>
  <div class="page-root">
    <RouterView />
    <AppSub />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Segoe UI';
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
