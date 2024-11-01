<script lang="ts" setup="">
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {TaskItem} from '@/enum/os'
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'
import {
  useElementMoveUpDetection,
  useMouseOver,
} from '@/components/CanUI/packages/ViewPortWindow/utils/use-utils'
import {TaskbarPinnedItem} from '@/components/OS/TaskBar/types'

const props = withDefaults(
  defineProps<{
    item: TaskItem | TaskbarPinnedItem
  }>(),
  {},
)
const emit = defineEmits(['mouseOverShow'])
const {item} = toRefs(props)

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const isTask = computed(() => !!item.value.guid)

// compatible like TaskItem
const commonItem = computed(() => {
  if (isTask.value) {
    return item.value
  }
  const find = systemStore.allApps.find((i) => i.appid === item.value.appid)
  return {
    ...item.value,
    title: find?.title,
    icon: find?.icon,
  }
})

const handleNewInstance = (item) => {
  systemStore.createTaskById(item.appid)
}

const handleItemClick = (item) => {
  if (!isTask.value) {
    handleNewInstance(item)
    return
  }
  systemStore.setTaskActive(item, true)
}

const visible = ref(true)
onMounted(() => {
  visible.value = true
})

watch(
  () => item.value.isClosing,
  (val) => {
    visible.value = !val
  },
)

const rootRef = ref()
useElementMoveUpDetection(rootRef, 30, (event) => {
  emit('mouseOverShow', rootRef.value)
})
</script>

<template>
  <div
    ref="rootRef"
    v-show="visible"
    tabindex="0"
    class="taskbar-item"
    :class="{active: item.guid === systemStore.activeId, 'is-task': isTask}"
    @click="handleItemClick(item)"
    @click.middle.prevent="handleNewInstance(item)"
  >
    <div class="task-item-main">
      <ThemedIcon v-if="commonItem.icon" :name="commonItem.icon" class="task-icon" />
      <span v-else class="mdi mdi-apps task-icon"></span>
      <span v-if="isTask && !settingsStore.taskbarIconOnly" class="text-overflow">
        {{ commonItem.title }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.taskbar-item {
  height: 100%;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 200px;
  overflow: hidden;
  transition: all 0.3s;
  gap: 8px;
  border: none;
  line-height: 1.2;
  cursor: pointer;
  background-color: transparent;
  color: inherit;

  &.is-task {
    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 8px;
      right: 8px;
      background-color: $primary;
      opacity: 1;
      height: 2px;
      transition: all 0.3s;
    }
  }

  &:hover,
  &.hover {
    background-color: $color_hover;
    &.is-task {
      &::after {
        left: 4px;
        right: 4px;
      }
    }
  }

  &.active {
    background-color: $primary_opacity;
    &.is-task {
      &::after {
        left: 0;
        right: 0;
      }
    }
  }

  .task-item-main {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    .task-icon {
      width: 24px;
      height: 24px;
      pointer-events: none;
    }
    .mdi {
      font-size: 24px;
      line-height: 1;
    }
  }

  .btn-close {
    display: inline-block;
    cursor: pointer;

    &:hover {
      color: #f44336;
    }
  }
}
</style>
