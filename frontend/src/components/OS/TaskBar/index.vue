<script lang="ts">
import {defineComponent} from 'vue'
import TrayClock from '@/components/OS/TaskBar/TrayClock.vue'
import StartMenu from '@/components/OS/StartMenu/index.vue'
import {useSystemStore} from '@/store/system'
import {useSettingsStore} from '@/store/settings'
import TrayBattery from '@/components/OS/TaskBar/TrayBattery.vue'
import TrayFps from '@/components/OS/TaskBar/TrayFps.vue'

export default defineComponent({
  name: 'TaskBar',
  components: {TrayFps, TrayBattery, StartMenu, TrayClock},
  setup() {
    const systemStore = useSystemStore()
    const settingsStore = useSettingsStore()
    const isShowStart = ref(false)
    const taskList = ref([])
    return {
      isShowStart,
      taskList,
      systemStore,
      settingsStore,
      handleItemClick(item) {
        const result = systemStore.setTaskActive(item, true)
      },
    }
  },
})
</script>

<template>
  <div class="canos-task-bar">
    <transition name="fade">
      <StartMenu v-model:visible="isShowStart" />
    </transition>
    <div class="task-bar-container vp-panel vp-window-panel _panel-bg">
      <div class="task-start-menu _fc">
        <button class="start-button vp-button" @click="isShowStart = !isShowStart">Start</button>
      </div>
      <div class="task-list _fc">
        <button
          class="task-item vp-button"
          v-for="item in systemStore.tasks"
          :key="item.guid"
          :class="{active: item.guid === systemStore.activeId}"
          @click="handleItemClick(item)"
        >
          <img v-if="item.icon" :src="item.icon" :alt="item.title" class="task-icon" />
          <span v-if="!settingsStore.taskbarIconOnly" class="text-overflow">
            {{ item.title }}
          </span>
          <!--          <span class="btn-close" @click="systemStore.closeTask(item.guid)">✕</span>-->
        </button>
      </div>
      <div class="task-tray _fc">
        <div class="tray-list _fc">
          <TrayFps />
          <TrayBattery />
          <TrayClock v-if="settingsStore.taskbarShowClock" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vp-window {
  &._maximized {
    bottom: $taskbar_height !important;
    height: calc(100% - $taskbar_height) !important;
  }
}
</style>
<style lang="scss" scoped>
.canos-task-bar {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: $taskbar_height;
  font-size: 14px;
  user-select: none;
  z-index: 100;

  .task-bar-container {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    border-radius: 0;
    border: none;
    //background-color: rgba(255, 255, 255, 0.8);
    //backdrop-filter: blur(10px);
    //box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

    ._fc {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .task-start-menu {
      display: flex;
      gap: 2px;
      .start-button {
        border-radius: 0;
        height: 100%;
        padding: 2px 10px;
        background: $primary;
        color: white;
      }
    }

    .task-list {
      flex: 1;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      gap: 2px;
      flex-wrap: wrap;
      overflow-y: auto;

      .task-item {
        height: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        max-width: 200px;
        overflow: hidden;
        transition: all 0.3s;
        gap: 4px;

        &:hover {
          background-color: white;
        }

        &::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          right: 0;
          height: 0;
          background-color: $primary;
          opacity: 0;
          transition: all 0.1s;
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.5);
          &::after {
            opacity: 1;
            height: 3px;
          }
        }

        .task-icon {
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .btn-close {
          display: inline-block;

          &:hover {
            color: red;
          }
        }
      }
    }

    .task-tray {
      .tray-list {
        height: 100%;
        padding: 0 4px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
}
</style>
