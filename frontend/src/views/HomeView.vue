<script lang="ts">
import {defineComponent} from 'vue'
import TaskBar from '@/components/OS/TaskBar/index.vue'
import DesktopWindowManager from '@/components/OS/DesktopWindowManager/index.vue'
import {useSystemStore} from '@/store/system'
import {useSettingsStore} from '@/store/settings'
import SystemStartup from '@/components/OS/SystemStartup.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    SystemStartup,
    DesktopWindowManager,
    TaskBar,
  },
  setup() {
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()
    onMounted(() => {
      // 自动启动应用
      const idsMap = {}
      systemStore.allApps.forEach((item) => {
        idsMap[item.appid] = item
      })
      settingsStore.appAutoStartIds.forEach((id: string) => {
        if (idsMap[id]) {
          systemStore.createTask(idsMap[id])
        }
      })
    })

    onBeforeUnmount(() => {
      systemStore.shutdown()
    })
  },
})
</script>

<template>
  <SystemStartup />
  <DesktopWindowManager>
    <TaskBar />
  </DesktopWindowManager>
</template>
