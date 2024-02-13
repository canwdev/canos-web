<script lang="ts">
import {defineComponent} from 'vue'
import {formatSiteTitle} from '@/router'
import {getServerInfo} from '@/api/server'
import {sleep} from '@/utils'
import {useSystemStore} from '@/store/system'

export default defineComponent({
  name: 'StartupLogs',
  setup() {
    const systemStore = useSystemStore()

    const logRef = ref('')
    const systemLog = ref('')
    const showStartLog = ref(true)

    async function appendLog(log: string, isError: boolean = false) {
      systemLog.value += `<span class="log ${isError ? 'error' : ''}">${log}</span><br>`
      await nextTick(() => {
        const container: HTMLElement = logRef.value as unknown as HTMLElement
        // 将滚动容器滚动到底部
        container.scrollTop = container.scrollHeight
      })
      await sleep(100)
    }
    async function startup() {
      await appendLog(formatSiteTitle())
      await appendLog('System is starting...')

      try {
        await appendLog('Get backend info...')
        const res = await getServerInfo()
        await appendLog(JSON.stringify(res))
        systemStore.isBackendAvailable = true
      } catch (e: any) {
        await appendLog(e.message, true)
        systemStore.isBackendAvailable = false
      }

      await appendLog('Welcome to use!')
      await sleep(500)

      showStartLog.value = false
    }
    onMounted(() => {
      startup()
    })
    return {
      logRef,
      systemLog,
      showStartLog,
    }
  },
})
</script>

<template>
  <div
    ref="logRef"
    v-if="showStartLog"
    class="system-startup-log font-code"
    v-html="systemLog"
  ></div>
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
