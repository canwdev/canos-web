<script lang="ts" setup>
import {useFullscreen} from '@vueuse/core'
import {useSystemStore} from '@/store/system'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {serverApi} from '@/api/server'

const systemStore = useSystemStore()
const doRefresh = () => {
  location.reload()
}
const {toggle: toggleFullscreen} = useFullscreen(document.documentElement)

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
</script>

<template>
  <div class="start-actions">
    <button class="action-button" @click="$emit('startApp', 'os.settings')" title="Setting">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01c0-.34-.03-.66-.07-.99l.01.02l2.44-1.92l-2.43-4.22l-2.87 1.16l.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01l-2.88-1.17l-2.44 4.22l2.44 1.92l.01-.02c-.04.33-.07.65-.07.99c0 .34.03.68.08 1.01l-.01-.02l-2.1 1.65l-.33.26l2.43 4.2l2.88-1.15l-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04l2.88 1.15l2.43-4.2s-.14-.12-.33-.26l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5z"
          fill="currentColor"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: currentColor"
        ></path>
      </svg>
    </button>
    <button class="action-button" @click="$emit('resetStart')" title="Refresh">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
          fill="currentColor"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: currentColor"
        ></path>
      </svg>
    </button>
    <button class="action-button" @click="toggleFullscreen" title="Fullscreen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
          fill="currentColor"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: currentColor"
        ></path>
      </svg>
    </button>
    <template v-if="systemStore.isBackendAvailable">
      <button
        class="action-button"
        @click="$router.push({name: 'IpChooserView'})"
        title="IP Address"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor"
          ></path>
        </svg>
      </button>

      <button class="action-button" @click="doLogout" title="Logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 2h9a2 2 0 0 1 2 2v2h-2V4H6v16h9v-2h2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor"
          ></path>
          <path
            d="M16.09 15.59L17.5 17l5-5l-5-5l-1.41 1.41L18.67 11H9v2h9.67z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor"
          ></path>
        </svg>
      </button>
      <button class="action-button" @click="confirmShutdown" title="Shutdown">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z"
            fill="currentColor"
            data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor"
          ></path>
        </svg>
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
    width: 45px;
    height: 45px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;

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
