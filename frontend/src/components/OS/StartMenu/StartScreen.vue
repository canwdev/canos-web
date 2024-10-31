<script lang="ts">
export default {
  name: 'StartScreen',
}
</script>

<script setup lang="ts">
import defaultStartLayout from '@/components/OS/StartMenu/Sub/default-layout.json'
import {ShortcutItem} from '@/enum/os'
import {useSystemStore} from '@/store/system'
import {useStorage} from '@vueuse/core'
import {useSettingsStore} from '@/store/settings'
import {StartItemSizeOptions, StartLayoutGroup, IStartMenuItem} from './types'
import QuickContextMenu from '@/components/CanUI/packages/QuickOptions/QuickContextMenu.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import {LsKeys} from '@/enum'
import StartDragOver from '@/components/OS/StartMenu/Sub/StartDragOver.vue'
import TitleEdit from '@/components/OS/StartMenu/Sub/TitleEdit.vue'
import {LineHelper} from '@/utils/line-helper'
import MenuDesktopIcon from '@/components/OS/StartMenu/MenuDesktopIcon.vue'

// const props = withDefaults(
//   defineProps<{
//   }>(),
//   {
//   },
// )
const emit = defineEmits(['onCreateTask'])

const systemStore = useSystemStore()
const settingsStore = useSettingsStore()

const handleItemClick = (item: ShortcutItem) => {
  emit('onCreateTask', systemStore.createTask(item))
}

const appListFiltered = computed((): ShortcutItem[] => {
  return systemStore.allApps
})
const appIdMapped = computed(() => {
  const map: {[key: string]: ShortcutItem} = {}
  appListFiltered.value.forEach((item) => {
    map[item.appid] = item
  })

  return map
})

const rootRef = ref()

const startLayoutColumns = useStorage<StartLayoutGroup[][]>(LsKeys.START_MENU_LAYOUT, [])
const refreshStartLayout = () => {
  // 查找缺失的app，并添加
  const startAppIdMap: {[key: string]: boolean} = {}
  startLayoutColumns.value.forEach((col) => {
    col.forEach((group) => {
      group.children.forEach((item) => {
        startAppIdMap[item.id] = true
      })
    })
  })
  console.log(startAppIdMap)
  const newApps: ShortcutItem[] = []
  appListFiltered.value.forEach((item) => {
    if (!startAppIdMap[item.appid]) {
      newApps.push(item)
    }
  })
  if (newApps.length > 0) {
    startLayoutColumns.value.push([
      {
        title: 'Apps',
        children: newApps.map((item, index) => {
          return {
            id: item.appid,
            size: index === 0 ? 'md' : 'sm',
          }
        }),
      },
    ])
  }
}
const startContentRef = ref()
// 定位线
const lineHelper = shallowRef()

onMounted(() => {
  if (!startLayoutColumns.value.length) {
    startLayoutColumns.value = JSON.parse(
      JSON.stringify(defaultStartLayout),
    ) as StartLayoutGroup[][]
  }
  refreshStartLayout()
  lineHelper.value = new LineHelper(startContentRef.value)
})

const ctxMenuRef = ref()
const editingMenuItem = ref<IStartMenuItem>()
const handleShowCtxMenu = (event, menuItem: IStartMenuItem) => {
  editingMenuItem.value = menuItem
  ctxMenuRef.value.isShow = false
  setTimeout(() => {
    ctxMenuRef.value.showMenu(event)
  })
}

const ctxMenuOptions = computed((): QuickOptionItem[] => {
  if (!editingMenuItem.value) {
    return []
  }
  return [
    // {
    //   label: 'Change Size',
    //   children: [],
    // },
    ...StartItemSizeOptions.map((item) => {
      return {
        label: item.label,
        props: {
          onClick: () => {
            editingMenuItem.value.size = item.value
          },
        },
      }
    }),
  ]
})

const isItemDragging = ref(false)
// 记录拖拽时的index，用于删除
type StarIndexData = {
  colIndex: number
  rowIndex: number
  index: number
}
const dragStartIndexData = ref<StarIndexData>()
const handleItemDragStart = (menuItem: IStartMenuItem, indexData: StarIndexData) => {
  editingMenuItem.value = menuItem
  dragStartIndexData.value = indexData
  isItemDragging.value = true
}
// 清理移动之前的元素
const removeOldItem = () => {
  if (!dragStartIndexData.value) {
    return
  }
  const {colIndex, rowIndex, index} = dragStartIndexData.value
  startLayoutColumns.value[colIndex][rowIndex].children.splice(index, 1)
  dragStartIndexData.value = undefined

  // 防止数组下标空指针
  setTimeout(() => {
    // 检测组是否为空，如果为空，清空
    if (!startLayoutColumns.value[colIndex][rowIndex].children.length) {
      startLayoutColumns.value[colIndex].splice(rowIndex, 1)
    }
    if (!startLayoutColumns.value[colIndex].length) {
      startLayoutColumns.value.splice(colIndex, 1)
    }
  })
}

const handleItemDragEnd = () => {
  editingMenuItem.value = undefined
  dragStartIndexData.value = undefined
  isItemDragging.value = false
}

// 创建新的列
const handleDropNewCol = () => {
  if (isGroupDragging.value && draggingGroup.value) {
    startLayoutColumns.value.push([draggingGroup.value])
    removeOldGroup()
    return
  }
  const item = editingMenuItem.value
  if (!item) {
    return
  }
  startLayoutColumns.value.push([{title: 'New Group', children: [item]}])
  removeOldItem()
}

// 创建新的行
const handleDropNewRow = (groupIndex) => {
  const item = editingMenuItem.value
  if (!item) {
    return
  }
  startLayoutColumns.value[groupIndex].push({title: 'New Group', children: [item]})
  removeOldItem()
}

const handleDragOver = (event) => {
  // console.log('handleDragOver')
  lineHelper.value.drawLine(event)
}
const handleDragLeave = (event) => {
  // console.log('handleDragLeave')
  lineHelper.value.hideLine()
}
const handleDrop = async (indexData: StarIndexData) => {
  lineHelper.value.hideLine()
  if (!isItemDragging.value) {
    return
  }
  const item = editingMenuItem.value
  if (!item) {
    return
  }
  const currentPosition = lineHelper.value.currentPosition
  const {colIndex, rowIndex, index} = indexData

  // 防止原地移动
  if (
    colIndex === dragStartIndexData.value?.colIndex &&
    rowIndex === dragStartIndexData.value?.rowIndex &&
    index === dragStartIndexData.value?.index
  ) {
    return
  }
  removeOldItem()
  let insertIndex = index
  if (currentPosition !== 'top') {
    insertIndex += 1
  }
  startLayoutColumns.value[colIndex][rowIndex].children.splice(insertIndex, 0, item)
}
const handleItemDropAtGroup = async (indexData: StarIndexData) => {
  lineHelper.value.hideLine()
  if (isGroupDragging.value) {
    // 拖拽组
    handleGroupDrop(indexData)
    return
  }
  const item = editingMenuItem.value
  if (!item) {
    return
  }
  const currentPosition = lineHelper.value.currentPosition
  const {colIndex, rowIndex, index} = indexData
  if (currentPosition !== 'top') {
    startLayoutColumns.value[colIndex][rowIndex].children.push(item)
  } else {
    startLayoutColumns.value[colIndex][rowIndex].children.unshift(item)
  }
  removeOldItem()
}

// 拖拽组
const isGroupDragging = ref(false)
const draggingGroup = shallowRef<StartLayoutGroup>()
const handleGroupDragStart = (group: StartLayoutGroup, indexData: StarIndexData) => {
  isGroupDragging.value = true
  draggingGroup.value = group
  dragStartIndexData.value = indexData
}
const handleGroupDragEnd = () => {
  isGroupDragging.value = false
  draggingGroup.value = undefined
  dragStartIndexData.value = undefined
}
// 清理移动之前的组
const removeOldGroup = () => {
  if (!dragStartIndexData.value) {
    return
  }
  const {colIndex, rowIndex} = dragStartIndexData.value
  startLayoutColumns.value[colIndex].splice(rowIndex, 1)
  // 防止数组下标空指针
  setTimeout(() => {
    if (!startLayoutColumns.value[colIndex].length) {
      startLayoutColumns.value.splice(colIndex, 1)
    }
  })
}
const handleGroupDrop = (indexData: StarIndexData) => {
  const group = draggingGroup.value
  console.log('handleGroupDrop', group)
  if (!group) {
    return
  }
  const currentPosition = lineHelper.value.currentPosition
  const {colIndex, rowIndex} = indexData
  // 防止原地移动
  if (
    colIndex === dragStartIndexData.value?.colIndex &&
    rowIndex === dragStartIndexData.value?.rowIndex
  ) {
    return
  }
  let insertIndex = rowIndex
  if (currentPosition !== 'top') {
    insertIndex += 1
  }
  removeOldGroup()
  startLayoutColumns.value[colIndex].splice(insertIndex, 0, group)
}
</script>

<template>
  <div ref="rootRef" class="start-screen">
    <div class="start-content" :class="{isItemDragging, isGroupDragging}" ref="startContentRef">
      <div v-for="(groups, colIndex) in startLayoutColumns" :key="colIndex" class="app-col">
        <div v-for="(group, rowIndex) in groups" :key="rowIndex" class="app-group">
          <TitleEdit
            :group="group"
            @dragstart="
              handleGroupDragStart(group, {
                colIndex,
                rowIndex,
                index: -1,
              })
            "
            @dragend="handleGroupDragEnd"
          />
          <div
            class="group-content"
            @dragover.prevent.stop="handleDragOver"
            @dragleave.prevent.stop="handleDragLeave"
            @drop.prevent.stop="
              handleItemDropAtGroup({
                colIndex,
                rowIndex,
                index: -1,
              })
            "
          >
            <template v-for="(menuItem, index) in group.children" :key="index">
              <MenuDesktopIcon
                v-if="appIdMapped[menuItem.id]"
                class="card-item"
                :menuItem="menuItem"
                :shortcutItem="appIdMapped[menuItem.id]"
                :class="[menuItem.size]"
                @click="handleItemClick(appIdMapped[menuItem.id])"
                @contextmenu.prevent="handleShowCtxMenu($event, menuItem)"
                :disabled="
                  appIdMapped[menuItem.id].requireBackend && !systemStore.isBackendAvailable
                "
                draggable="true"
                @dragstart="
                  handleItemDragStart(menuItem, {
                    colIndex,
                    rowIndex,
                    index,
                  })
                "
                @dragend="handleItemDragEnd"
                @dragover.prevent.stop="handleDragOver"
                @dragleave.prevent.stop="handleDragLeave"
                @drop.prevent.stop="
                  handleDrop({
                    colIndex,
                    rowIndex,
                    index,
                  })
                "
              />
            </template>
          </div>
        </div>

        <StartDragOver
          class="app-group"
          v-if="isItemDragging"
          @drop.prevent="handleDropNewRow(colIndex)"
        />
      </div>

      <StartDragOver
        class="app-col"
        v-if="isItemDragging || isGroupDragging"
        @drop.prevent="handleDropNewCol"
      />

      <QuickContextMenu :options="ctxMenuOptions" ref="ctxMenuRef" />

      <!-- 辅助定位线 -->
      <div class="line-helper-x"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-screen {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  //padding: 20px 20px;
  padding: 10px 2px;
  box-sizing: border-box;

  .start-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 40px;

    &.isItemDragging {
      .card-item {
        transform: scale(0.95);
      }
    }

    &.isGroupDragging {
      .app-group {
        transform: scale(0.95);
      }
      .card-item {
        pointer-events: none;
      }
      .group-title {
        opacity: 0.3;
      }
    }

    .app-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 30px;

      .app-group {
        min-width: 300px;
        transition: all 0.2s;

        .group-content {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: auto;
          gap: 8px;

          .card-item {
            //background: $primary;
            transition: all 0.2s;

            &.md {
              grid-column: span 2;
              grid-row: span 2;
              //background-color: rgb(133, 63, 163);
            }

            &.lg {
              grid-column: span 4;
              //background-color: rgb(163, 100, 63);
            }

            &.xl {
              grid-column: span 4;
              //background-color: rgb(65, 163, 63);
            }

            &:hover,
            &:active,
            &:focus {
              //outline: 2px solid white;
            }

            &:active {
              transform: scale(0.9);
            }
          }
        }
      }
    }
  }
}
.line-helper-x {
  width: 20px;
  height: 3px;
  position: fixed;
  //background-color: rgba($debugColor, 0.8);
  //background: linear-gradient(to right, rgba($debugColor, 0.8), rgba($debugColor2, 0.8));
  background: #fff;
  pointer-events: none;
  transition: all 0.3s;
  visibility: hidden;
  opacity: 0;

  &.visible {
    visibility: visible;
    opacity: 0.7;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
  }

  $arrow_size: 8px;

  &:before {
    left: -$arrow_size;
    top: 50%;
    transform: translateY(-50%);
    border: $arrow_size solid transparent;
    border-left-color: #fff;
  }

  &:after {
    right: -$arrow_size;
    top: 50%;
    transform: translateY(-50%);
    border: $arrow_size solid transparent;
    //border-right-color: $debugColor2;
    border-right-color: #fff;
  }
}
</style>
