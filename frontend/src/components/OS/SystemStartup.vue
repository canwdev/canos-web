<script lang="ts">
import {defineComponent} from 'vue'
import {formatSiteTitle} from '@/router'
import {getServerInfo} from '@/api/server'
import {sleep} from '@/utils'
import {useSystemStore} from '@/store/system'

export default defineComponent({
  name: 'SystemStartup',
  setup() {
    const systemStore = useSystemStore()

    const systemLog = ref('')
    const showStartLog = ref(true)

    function appendLog(log: string, isError: boolean = false) {
      systemLog.value += `<span class="${isError ? 'error' : ''}">${log}</span><br>`
    }
    async function startup() {
      appendLog(formatSiteTitle())
      appendLog('System is starting...')

      try {
        appendLog('Get backend info...')
        const res = await getServerInfo()
        appendLog(JSON.stringify(res))
        systemStore.isBackendAvailable = true
      } catch (e: any) {
        appendLog(e.message, true)
        systemStore.isBackendAvailable = false
      }

      appendLog('Welcome to use!')
      await sleep(500)

      showStartLog.value = false
    }
    onMounted(() => {
      startup()
    })
    return {
      systemLog,
      showStartLog,
    }
  },
})
</script>

<template>
  <div v-if="showStartLog" class="system-startup-log font-code" v-html="systemLog"></div>
</template>

<style lang="scss">
.system-startup-log {
  background-color: black;
  color: #0f0;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .error {
    color: red;
  }
}
</style>
