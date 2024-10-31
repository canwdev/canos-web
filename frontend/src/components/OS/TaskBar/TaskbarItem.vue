<script lang="ts" setup="">
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'
import {TaskItem} from '@/enum/os'
import {useSettingsStore} from '@/store/settings'
import {useSystemStore} from '@/store/system'

const props = withDefaults(
  defineProps<{
    item: TaskItem
  }>(),
  {},
)
const emit = defineEmits([])
const {item} = toRefs(props)

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const handleItemClick = (item) => {
  const result = systemStore.setTaskActive(item, true)
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
</script>

<template>
  <div
    v-show="visible"
    tabindex="0"
    class="taskbar-item"
    :class="{active: item.guid === systemStore.activeId}"
    @click="handleItemClick(item)"
  >
    <div class="task-item-main">
      <ThemedIcon v-if="item.icon" :name="item.icon" class="task-icon" />
      <span v-if="!settingsStore.taskbarIconOnly" class="text-overflow">
        {{ item.title }}
      </span>
    </div>
    <div
      v-if="!settingsStore.taskbarIconOnly"
      class="btn-close"
      @click="systemStore.closeTask(item.guid)"
    >
      ✕
    </div>
  </div>
</template>

<style lang="scss" scoped>
.taskbar-item {
  height: 100%;
  padding: 0 10px;
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

  &:hover {
    background-color: $color_hover;
  }

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

  &:hover {
    &::after {
      left: 4px;
      right: 4px;
    }
  }

  &.active {
    background-color: $primary_opacity;
    &::after {
      left: 0;
      right: 0;
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
