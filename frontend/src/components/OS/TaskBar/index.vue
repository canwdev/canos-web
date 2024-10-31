<script lang="ts">
export default {
  name: 'TaskBar',
}
</script>
<script setup lang="ts">
import TrayClock from '@/components/OS/TaskBar/TrayClock.vue'
import StartMenu from '@/components/OS/StartMenu/index.vue'
import {useSystemStore} from '@/store/system'
import {useSettingsStore} from '@/store/settings'
import TrayBattery from '@/components/OS/TaskBar/TrayBattery.vue'
import TrayFps from '@/components/OS/TaskBar/TrayFps.vue'
import TrayNetwork from '@/components/OS/TaskBar/TrayNetwork.vue'
import TrayMemory from '@/components/OS/TaskBar/TrayMemory.vue'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import TaskbarItem from '@/components/OS/TaskBar/TaskbarItem.vue'

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()
const isShowStart = ref(true)
</script>

<template>
  <div class="canos-task-bar vp-panel">
    <transition name="fade-up">
      <StartMenu v-model:visible="isShowStart" />
    </transition>
    <div class="task-bar-container vp-window-panel">
      <button
        class="task-start-menu btn-no-style _fc"
        :class="{active: isShowStart}"
        @click="isShowStart = !isShowStart"
      >
        <img class="menu-logo" src="@/assets/images/logo.svg" alt="start" />
      </button>
      <div class="task-side">
        <transition-group
          tag="div"
          name="task-fade"
          v-show="systemStore.tasks.length"
          class="task-list _fc"
        >
          <TaskbarItem v-for="item in systemStore.tasks" :key="item.guid" :item="item" />
        </transition-group>
      </div>
      <div class="task-tray _fc">
        <div class="tray-list _fc">
          <TrayFps v-if="settingsStore.taskbarShowFps" />
          <TrayMemory v-if="settingsStore.taskbarShowMemory" />
          <TrayBattery v-if="settingsStore.taskbarShowBattery" />
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
<style lang="scss">
/* 1. declare transition */
.task-fade-move,
.task-fade-enter-active,
.task-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.task-fade-enter-from,
.task-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.task-fade-leave-active {
  position: absolute;
}

.canos-task-bar {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: $taskbar_height;
  font-size: 14px;
  user-select: none;
  z-index: 100;
  border-left: 0 !important;
  border-right: 0 !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;

  .task-bar-container {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: hidden;
    border-radius: 0 !important;
    border: none;
    box-sizing: border-box;
    //background-color: rgba(255, 255, 255, 0.8);
    //backdrop-filter: blur(10px);
    box-shadow: none;

    ._fc {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .task-start-menu {
      display: flex;
      gap: 2px;
      background-color: transparent;
      transition: all 0.3s;
      width: 44px;
      align-items: center;
      justify-content: center;
      &:hover,
      &.active {
        background-color: rgba(198, 198, 198, 0.3);
      }
      .start-button {
        border-radius: 0;
        height: 100%;
        padding: 2px 10px;
      }
      .menu-logo {
        width: 32px;
        height: 32px;
        display: block;
      }
    }

    .task-side {
      flex: 1;
      display: flex;
      overflow-x: auto;
    }

    .task-list {
      padding: 0 4px;
      display: flex;
      gap: 2px;
      box-sizing: border-box;
      pointer-events: auto;
      flex-wrap: nowrap;
    }

    .task-tray {
      .tray-list {
        height: 100%;
        padding: 0 4px;
        display: flex;
        align-items: center;
        gap: 4px;

        .tray-icon {
          display: inline-flex;
          & > svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
