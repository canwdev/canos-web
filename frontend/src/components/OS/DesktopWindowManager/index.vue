<script lang="ts" setup>
import DesktopWallpaper from '@/components/OS/DesktopWindowManager/DesktopWallpaper.vue'
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import {useSystemStore} from '@/store/system'
import DesktopContent from '@/components/OS/DesktopWindowManager/DesktopContent.vue'
import {useSettingsStore} from '@/store/settings'
import {TaskItem} from '@/enum/os'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()
const vpWindowRefs = ref()

watch(
  () => systemStore.tasks,
  (list) => {
    if (settingsStore.isWindowed) {
      setTimeout(() => {
        // 给每一个任务设置窗口ref
        list.forEach((i: TaskItem, index) => {
          if (!i.windowRef) {
            i.windowRef = vpWindowRefs.value[index]
          }
        })
      })
    }
  },
)

const getIsMaximum = (task: TaskItem) => {
  return task.maximized
}
</script>

<template>
  <div class="desktop-window-manager">
    <DesktopWallpaper>
      <DesktopContent />
    </DesktopWallpaper>

    <template v-for="task in systemStore.tasks" :key="task.guid">
      <ViewPortWindow
        v-if="settingsStore.isWindowed"
        ref="vpWindowRefs"
        @onActive="systemStore.setTaskActive(task)"
        @onClose="systemStore.closeTask(task.guid)"
        :visible="!task.minimized && !task.isClosing"
        :wid="task.appid"
        :init-win-options="task.winOptions"
        :allow-move="!getIsMaximum(task)"
        :allow-maximum="true"
        v-model:maximized="task.maximized"
        :allow-minimum="true"
        v-model:minimized="task.minimized"
      >
        <template #titleBarLeft>
          <ThemedIcon class="window-icon" :name="task.icon" />
          <span>{{ task.title }}</span>
        </template>

        <component
          v-if="task.component"
          :is="task.component"
          :task="task"
          :appParams="task.params"
        ></component>
        <iframe
          v-else-if="task.url"
          :src="task.url"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
      </ViewPortWindow>
      <div v-else class="static-window vp-bg" v-show="task.guid === systemStore.activeId">
        <component
          v-if="task.component"
          :is="task.component"
          :task="task"
          :appParams="task.params"
        ></component>
        <iframe
          v-else-if="task.url"
          :src="task.url"
          frameborder="0"
          style="width: 100%; height: 100%"
        ></iframe>
      </div>
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
  .static-window {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: $taskbar_height;
    z-index: 10;
  }
}
</style>
