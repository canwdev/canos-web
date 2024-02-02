<script lang="ts">
import {defineComponent} from 'vue'
import TaskBar from '@/components/OS/TaskBar/index.vue'
import DesktopWindowManager from '@/components/OS/DesktopWindowManager/index.vue'
import {useSystemStore} from '@/store/system'
import {AllAppList} from '@/apps/app-list'
import {useSettingsStore} from '@/store/settings'

export default defineComponent({
  name: 'HomeView',
  components: {
    DesktopWindowManager,
    TaskBar,
  },
  setup() {
    const settingsStore = useSettingsStore()
    const systemStore = useSystemStore()
    onMounted(() => {
      // 自动启动应用
      const idsMap = {}
      AllAppList.forEach((item) => {
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
  <DesktopWindowManager>
    <TaskBar />
  </DesktopWindowManager>
</template>
