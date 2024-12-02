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
import TrayMemory from '@/components/OS/TaskBar/TrayMemory.vue'
import TaskbarItem from '@/components/OS/TaskBar/TaskbarItem.vue'
import QuickContextMenu from '@/components/CanUI/packages/QuickOptions/QuickContextMenu.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import {TaskItem} from '@/enum/os'
import {TaskbarPinnedItem, usePinUnpinned} from '@/components/OS/TaskBar/types'
import TrayShowDesktop from '@/components/OS/TaskBar/TrayShowDesktop.vue'
import {useMainStore} from '@/store/main'

const mainStore = useMainStore()
const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const taskItemMenuRef = ref()
const currentTaskItem = ref<TaskItem | null>(null)
const handleTaskbarItemMenu = (target, item) => {
  // console.log('handleTaskbarItemMenu', target, item)
  currentTaskItem.value = item
  setTimeout(() => {
    const taskItemEl = target.closest('.taskbar-item')
    taskItemMenuRef.value.showMenuByElement(taskItemEl)
  })
}

const {getPinUnpinOption} = usePinUnpinned()

const taskItemMenuOptions = computed((): QuickOptionItem[] => {
  if (!currentTaskItem.value) {
    return []
  }
  // console.log(currentTaskItem.value)
  const idx = settingsStore.taskbarPinnedList.findIndex(
    (i) => i.appid === currentTaskItem.value.appid,
  )
  const isTask = !!currentTaskItem.value.guid
  const options = [getPinUnpinOption(currentTaskItem.value.appid)]
  if (isTask) {
    options.push({
      label: 'Close window',
      iconClass: 'mdi mdi-close',
      props: {
        onClick() {
          systemStore.closeTask(currentTaskItem.value!.guid)
          currentTaskItem.value = null
        },
      },
    })
  }

  return options
})
const handleMenuClose = () => {
  currentTaskItem.value = null
}

const taskbarList = computed(() => {
  const filteredList = [...settingsStore.taskbarPinnedList]

  const pinnedIndexMap: {[appid: string]: number} = {}

  settingsStore.taskbarPinnedList.forEach((item, index) => {
    pinnedIndexMap[item.appid] = index
  })

  const sameAppidGroupMap: {[appid: string]: TaskItem[]} = {}
  systemStore.tasks.forEach((item: TaskItem | TaskbarPinnedItem) => {
    // is TaskItem
    const pinnedIndex = pinnedIndexMap[item.appid]
    // set new task spawn location
    if (typeof pinnedIndex === 'number') {
      if (filteredList[pinnedIndex].guid) {
        // add new instance after last same task
        if (!sameAppidGroupMap[item.appid]) {
          sameAppidGroupMap[item.appid] = []
        }
        sameAppidGroupMap[item.appid].push(item)
      } else {
        // replace pinned item as running task
        filteredList.splice(pinnedIndex, 1, item)
      }
    } else {
      filteredList.push(item)
    }
  })

  // add new instance after last same task
  for (const appid in sameAppidGroupMap) {
    const list = sameAppidGroupMap[appid]
    const pinnedIndex = pinnedIndexMap[appid]
    filteredList.splice(pinnedIndex + 1, 0, ...list)
  }

  return filteredList
})
</script>

<template>
  <div class="canos-task-bar vp-panel" @contextmenu.prevent>
    <transition name="fade-up">
      <StartMenu v-model:visible="mainStore.isShowStart" />
    </transition>
    <QuickContextMenu
      :transition-name="`fade-up`"
      :options="taskItemMenuOptions"
      ref="taskItemMenuRef"
      @onClose="handleMenuClose"
    />
    <div class="task-bar-container vp-window-panel">
      <button
        class="task-start-menu btn-no-style _fc"
        :class="{active: mainStore.isShowStart}"
        @click="mainStore.isShowStart = !mainStore.isShowStart"
        title="Quick Start (alt+q)"
      >
        <span class="menu-logo-icon mdi mdi-apps"></span>
        <!--<img class="menu-logo" src="@/assets/images/logo.svg" alt="start" />-->
      </button>
      <div class="task-side">
        <transition-group
          tag="div"
          name="task-fade"
          v-show="taskbarList.length"
          class="task-list _fc"
        >
          <TaskbarItem
            v-for="item in taskbarList"
            :key="item.guid || `p${item.appid}`"
            :item="item"
            @contextmenu.prevent="handleTaskbarItemMenu($event.target, item)"
            @mouseOverShow="(target) => handleTaskbarItemMenu(target, item)"
          />
        </transition-group>
      </div>
      <div class="task-tray _fc">
        <div class="tray-list _fc">
          <TrayFps v-if="settingsStore.taskbarShowFps" />
          <TrayMemory v-if="settingsStore.taskbarShowMemory" />
          <TrayBattery v-if="settingsStore.taskbarShowBattery" />
          <TrayClock v-if="settingsStore.taskbarShowClock" />
          <TrayShowDesktop />
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
    backdrop-filter: blur(10px);
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

      &:active {
        .menu-logo-icon {
          transform: scale(0.88);
        }
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
      .menu-logo-icon {
        font-size: 32px;
        line-height: 1;
        color: $primary;
        transition: all 0.1s;
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
        display: flex;
        align-items: center;

        & > div {
          padding-left: 8px;
          padding-right: 8px;
          height: 100%;
          display: flex;
          align-items: center;

          &:hover {
            background-color: $color_border;
          }
        }

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
