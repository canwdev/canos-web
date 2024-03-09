<script lang="ts">
import {defineComponent} from 'vue'
import DesktopWallpaper from '@/components/OS/DesktopWindowManager/DesktopWallpaper.vue'
import ViewPortWindow from '@/components/CommonUI/ViewPortWindow/index.vue'
import {useSystemStore} from '@/store/system'
import {Subtract20Filled} from '@vicons/fluent'
import DesktopContent from '@/components/OS/DesktopWindowManager/DesktopContent.vue'
import {useSettingsStore} from '@/store/settings'
import {TaskItem} from '@/enum/os'

export default defineComponent({
  name: 'DesktopWindowManager',
  components: {
    DesktopContent,
    ViewPortWindow,
    DesktopWallpaper,
    Subtract20Filled,
  },
  setup() {
    const systemStore = useSystemStore()
    const settingsStore = useSettingsStore()
    const vpWindowRefs = ref()

    watch(
      () => systemStore.tasks,
      (list) => {
        setTimeout(() => {
          // 给每一个任务设置窗口ref
          list.forEach((i: TaskItem, index) => {
            if (!i.windowRef) {
              i.windowRef = vpWindowRefs.value[index]
            }
          })
        })
      }
    )

    return {
      systemStore,
      settingsStore,
      vpWindowRefs,
      getIsMaximum(task: TaskItem) {
        if (!settingsStore.isWindowed) {
          return true
        }
        return task.maximized
      },
    }
  },
})
</script>

<template>
  <div class="desktop-window-manager">
    <DesktopWallpaper>
      <DesktopContent />
    </DesktopWallpaper>

    <template v-for="task in systemStore.tasks" :key="task.guid">
      <ViewPortWindow
        ref="vpWindowRefs"
        @onActive="systemStore.setTaskActive(task)"
        @onClose="systemStore.closeTask(task.guid)"
        :visible="!task.minimized"
        :wid="task.winId || null"
        :init-win-options="task.winOptions || null"
        :allow-move="!getIsMaximum(task)"
        :allow-maximum="settingsStore.isWindowed"
        v-model:maximized="task.maximized"
        :allow-minimum="true"
        v-model:minimized="task.minimized"
      >
        <template #titleBarLeft>
          <img class="window-icon" :src="task.icon" :alt="task.title" />
          <span>{{ task.title }}</span>
        </template>

        <component v-if="task.component" :is="task.component"></component>
      </ViewPortWindow>
    </template>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.desktop-window-manager {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  overflow: hidden;
  user-select: none;
  .vp-window {
    min-width: 350px;
    min-height: 200px;
  }
}
</style>
