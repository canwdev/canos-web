<script setup lang="ts">
import {formatSiteTitle} from '@/router'
import {sleep} from '@/utils'
import {useSystemStore} from '@/store/system'
import {useThemeOptions} from '@/components/CommonUI/ViewPortWindow/utils/use-theme'
import {useIconThemes} from '@/components/OS/ThemedIcon/use-icon-themes'

const systemStore = useSystemStore()
const {loadThemes} = useThemeOptions()
const {loadIconThemes} = useIconThemes()

const logRef = ref('')
const systemLog = ref('')

async function appendLog(log: string, isError: boolean = false) {
  systemLog.value += `<span class="log ${isError ? 'error' : ''}">${log}</span><br>`
  await nextTick(() => {
    const container: HTMLElement = logRef.value as unknown as HTMLElement
    // 将滚动容器滚动到底部
    container.scrollTop = container.scrollHeight
  })
}

const tryFn = async (fn, message) => {
  try {
    message && (await appendLog(message))
    await fn()
  } catch (error: any) {
    message && (await appendLog(error.message, true))
  }
}

async function startup() {
  await appendLog(formatSiteTitle())
  await appendLog('System is starting...')

  await tryFn(loadThemes, 'Loading themes...')

  await tryFn(loadIconThemes, 'Loading icon themes...')

  await appendLog('Welcome to use!')

  systemStore.isStarting = false
}
onMounted(() => {
  startup()
})
</script>

<template>
  <div ref="logRef" class="system-startup-log font-code" v-html="systemLog"></div>
</template>

<style lang="scss">
.system-startup-log {
  overflow-y: auto;
  background-color: black;
  color: #0f0;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .log {
    &.error {
      color: red;
    }
  }
}
</style>
