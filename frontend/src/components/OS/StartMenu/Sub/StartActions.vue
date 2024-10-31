<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core'
import {useSystemStore} from '@/store/system'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {serverApi} from '@/api/server'
import {useRouter} from 'vue-router'

const emit = defineEmits(['startApp', 'actionOpened'])

const router = useRouter()
const systemStore = useSystemStore()
const doRefresh = () => {
  location.reload()
}
const {
  toggle: toggleFullscreen,
  isFullscreen,
  isSupported: isSupportedFullScreen,
} = useFullscreen(document.documentElement)

const doLogout = () => {
  globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
}

const doShutdown = async () => {
  systemStore.shutdown()
  await serverApi.shutdown()
  location.reload()
}
const confirmShutdown = () => {
  window.$dialog
    .confirm(`确认停止服务？停止后需要在服务端手动启动。`, 'Confirm Shutdown', {
      type: 'warning',
    })
    .then(() => {
      doShutdown()
    })
    .catch()
}
const handleOpenRoute = (to) => {
  const url = router.resolve(to).fullPath
  systemStore.createTaskById('os.web_browser', {url})
  emit('actionOpened')
}
</script>

<template>
  <div class="start-actions">
    <button class="action-button" @click="$emit('startApp', 'os.settings')" title="Setting">
      <span class="mdi mdi-cog"></span>
    </button>

    <button
      v-if="isSupportedFullScreen"
      class="action-button"
      @click="toggleFullscreen"
      title="Fullscreen"
    >
      <span v-if="!isFullscreen" class="mdi mdi-fullscreen"></span>
      <span v-else class="mdi mdi-fullscreen-exit"></span>
    </button>
    <template v-if="systemStore.isBackendAvailable">
      <button
        class="action-button"
        @click="handleOpenRoute({name: 'IpChooserView'})"
        title="IP Address"
      >
        <span class="mdi mdi-ip-outline"></span>
      </button>
      <button class="action-button" @click="handleOpenRoute({name: 'AdminRootView'})" title="Admin">
        <span class="mdi mdi-shield-account-outline"></span>
      </button>

      <button class="action-button" @click="doLogout" title="Logout">
        <span class="mdi mdi-logout"></span>
      </button>
      <button class="action-button" @click="confirmShutdown" title="Shutdown">
        <span class="mdi mdi-power"></span>
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.start-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .action-button {
    width: 38px;
    height: 38px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    border-radius: 4px;

    .mdi {
      font-size: 26px;
    }

    img,
    svg {
      width: 100%;
      height: 100%;
    }

    &:hover,
    &:active,
    &:focus {
      background-color: $primary;
    }

    &:active {
      transform: scale(0.8);
    }
  }
}
</style>
