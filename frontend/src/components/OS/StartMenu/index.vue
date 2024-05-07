<script lang="ts">
import {defineComponent} from 'vue'
import StartMenuItem from '@/components/OS/StartMenu/StartMenuItem.vue'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {onClickOutside, useFullscreen} from '@vueuse/core'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {useSettingsStore} from '@/store/settings'
import {serverApi} from '@/api/server'

export default defineComponent({
  name: 'StartMenu',
  components: {StartMenuItem},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const mVisible = useModelWrapper(props, emit, 'visible')
    const systemStore = useSystemStore()
    const settingsStore = useSettingsStore()

    const filterText = ref('')

    const handleItemClick = (item: ShortcutItem) => {
      mVisible.value = false

      systemStore.createTask(item)
    }

    const appListFiltered = computed(() => {
      return systemStore.allApps
    })

    const rootRef = ref()

    onClickOutside(rootRef, (event) => {
      if (mVisible.value) {
        setTimeout(() => {
          mVisible.value = false
        })
      }
    })

    const doShutdown = async () => {
      mVisible.value = false
      systemStore.shutdown()
      await serverApi.shutdown()
      location.reload()
    }

    const confirmShutdown = () => {
      window.$dialog.warning({
        title: 'Confirm Shutdown',
        content: `确认停止服务？停止后需要在服务端手动启动。`,
        positiveText: 'OK',
        negativeText: 'Cancel',
        onPositiveClick: () => {
          doShutdown()
        },
        onNegativeClick: () => {},
      })
    }

    const doRefresh = () => {
      location.reload()
    }

    const doLogout = () => {
      globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
    }

    const {toggle: toggleFullscreen} = useFullscreen(document.documentElement)

    return {
      rootRef,
      mVisible,
      systemStore,
      appListFiltered,
      handleItemClick,
      confirmShutdown,
      doRefresh,
      doLogout,
      toggleFullscreen,
      settingsStore,
    }
  },
})
</script>

<template>
  <div
    ref="rootRef"
    v-if="mVisible"
    class="start-menu vp-panel vp-window-panel _panel-bg"
    :class="{_full: !settingsStore.isWindowed}"
  >
    <div class="start-menu-row">
      <div class="start-menu-left">
        <div class="program-list vp-bg">
          <div class="shortcut-list">
            <StartMenuItem
              :item="item"
              v-for="(item, index) in appListFiltered"
              :key="index"
              @click="handleItemClick(item)"
              :disabled="item.requireBackend && !systemStore.isBackendAvailable"
            />
          </div>
        </div>
      </div>
      <div class="start-menu-right">
        <button class="vp-button" @click="doRefresh">🔃 Refresh</button>
        <button class="vp-button" @click="toggleFullscreen">📺 Fullscreen</button>
        <template v-if="systemStore.isBackendAvailable">
          <button class="vp-button" @click="$router.push({name: 'IpChooserView'})">🌐 IP</button>

          <button class="vp-button" @click="doLogout">🚪 Logout</button>
          <button class="vp-button" @click="confirmShutdown">✖️ Shutdown</button>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-menu {
  width: 400px;
  //background-color: rgba(255, 255, 255, 0.8);
  //backdrop-filter: blur(10px);
  //box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: $taskbar_height;
  user-select: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &._full {
    width: 100%;
    border: none;
    border-radius: 0;
    top: 0;
    box-shadow: none !important;
    .start-menu-row,
    .start-menu-left,
    .program-list {
      height: 100%;
    }

    .program-list {
      display: flex;
      flex-direction: column;

      .shortcut-list {
        flex: 1;
        max-height: 100%;
      }
    }
  }

  .start-menu-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 8px;
    gap: 8px;
    .start-menu-left {
      flex: 1;
    }

    .start-menu-right {
      width: 150px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 4px;
      button {
        width: 100%;
        padding: 4px 10px;
        font-size: 14px;
        text-align: inherit;
      }
    }
  }

  .program-list {
    min-height: 300px;
  }

  .shortcut-list {
    max-height: 300px;
    overflow: auto;
  }

  .shortcut-split {
    margin-top: 5px;
    margin-bottom: 5px;
    border-top: 1px solid $color_border;
  }

  .start-menu-bottom {
    border-top: 1px solid $color_border;
    height: $taskbar_height;
  }
}
</style>
