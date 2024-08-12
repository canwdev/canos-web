<script lang="ts">
import {darkTheme, GlobalThemeOverrides} from 'naive-ui'
import {useGlobalTheme} from '@/hooks/use-global-theme'
import AppSub from '@/AppSub.vue'
import {useSettingsStore} from '@/store/settings'

export default defineComponent({
  components: {
    AppSub,
  },
  setup() {
    const {isAppDarkMode, themeOverrides} = useGlobalTheme()
    const settingsStore = useSettingsStore()

    return {
      settingsStore,
      isAppDarkMode,
      darkTheme,
      themeOverrides,
    }
  },
})
</script>

<template>
  <n-config-provider
    :theme="isAppDarkMode ? darkTheme : null"
    :theme-overrides="themeOverrides"
    class="page-root _line-grid"
    inline-theme-disabled
  >
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-message-provider placement="top">
          <n-dialog-provider>
            <RouterView />
            <AppSub />
          </n-dialog-provider>
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
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
