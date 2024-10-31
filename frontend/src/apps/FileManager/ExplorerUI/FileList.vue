<script lang="ts" setup>
import {IEntry, SortType} from '@server/types/server'
import FileListItem from './FileListItem.vue'
import {useVModel} from '@vueuse/core'
import FileGridItem from './FileGridItem.vue'
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'
import QuickContextMenu from '@/components/CanUI/packages/QuickOptions/QuickContextMenu.vue'
import UploadQueue from '../UploadQueue.vue'
import {useCopyPaste} from './hooks/use-copy-paste'
import {ExplorerEvents, useExplorerBusOn} from '../utils/bus'
import {useLayoutSort} from './hooks/use-layout-sort'
import {useSelection} from './hooks/use-selection'
import {useFileActions} from './hooks/use-file-actions'
import {useTransfer} from './hooks/use-transfer'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'

const emit = defineEmits(['open', 'update:isLoading', 'refresh'])

const props = withDefaults(
  defineProps<{
    files: IEntry[]
    isLoading: boolean
    basePath: string
    // 是否文件(夹)选择器
    selectFileMode?: 'file' | 'folder'
    // 文件选择器允许多选
    multiple?: boolean
    contentOnly?: boolean
    gridView?: boolean
    moreOptions?: QuickOptionItem[]
  }>(),
  {
    moreOptions() {
      return []
    },
  },
)
const {basePath, files, selectFileMode, multiple, moreOptions} = toRefs(props)
const isLoading = useVModel(props, 'isLoading', emit)
useExplorerBusOn(ExplorerEvents.REFRESH, () => emit('refresh'))

// 布局和排序方式
const {isGridView, showSortMenu, sortOptions, filteredFiles, showHidden} = useLayoutSort(files)

const allowMultipleSelection = computed(() => {
  if (selectFileMode.value === 'folder') {
    return false
  } else if (selectFileMode.value === 'file') {
    return multiple.value
  }
  return true
})

// 文件选择功能
const {
  selectedItems,
  selectedItemsSet,
  explorerContentRef,
  toggleSelect,
  toggleSelectAll,
  selectedPaths,
} = useSelection({filteredFiles, basePath, allowMultipleSelection})

// 复制粘贴功能
const {enablePaste, handleCut, handleCopy, handlePaste} = useCopyPaste({
  selectedPaths,
  basePath,
  isLoading,
  emit,
})

// 上传下载功能
const {
  uploadQueueRef,
  dropZoneRef,
  isOverDropZone,
  openSelectFiles,
  openSelectFolder,
  handleDownload,
} = useTransfer({basePath, isLoading, selectedItems})

// 文件操作功能
const {
  handleCreateFile,
  handleCreateFolder,
  handleRename,
  confirmDelete,
  ctxMenuOptions,
  ctxMenuRef,
  handleShowCtxMenu,
  enableAction,
} = useFileActions({
  isLoading,
  selectedPaths,
  basePath,
  selectedItems,
  enablePaste,
  handlePaste,
  handleCut,
  handleCopy,
  selectedItemsSet,
  handleDownload,
  emit,
})

const allContextMenu = computed((): QuickOptionItem[] => {
  return [
    {
      label: 'Create Document',
      props: {
        onClick() {
          handleCreateFile()
        },
      },
    },
    {
      label: 'Create Folder',
      props: {
        onClick() {
          handleCreateFolder()
        },
      },
    },
    {split: true},
    {
      label: 'Upload Files...',
      props: {
        onClick() {
          openSelectFiles()
        },
      },
    },
    {
      label: 'Upload Folder...',
      props: {
        onClick() {
          openSelectFolder()
        },
      },
    },
    {split: true},
    {label: 'Sort', children: sortOptions.value},
    {split: true},
    ...ctxMenuOptions.value,
    ...moreOptions.value,
  ]
})

defineExpose({
  selectedItems,
  basePath,
})
</script>

<template>
  <div
    ref="dropZoneRef"
    :class="{isOverDropZone}"
    v-loading="isLoading"
    class="explorer-list-wrap"
    @contextmenu.prevent
  >
    <div v-if="!contentOnly" class="explorer-actions vp-panel">
      <div class="action-group">
        <button class="btn-action btn-no-style" @click="handleCreateFile()" title="Create Document">
          <span class="mdi mdi-file-document-plus-outline"></span>
        </button>
        <button class="btn-action btn-no-style" @click="handleCreateFolder()" title="Create Folder">
          <span class="mdi mdi-folder-plus-outline"></span>
        </button>

        <template v-if="!selectFileMode">
          <div class="split-line"></div>

          <button
            class="btn-action btn-no-style"
            @click="() => openSelectFiles()"
            title="Upload Files..."
          >
            <span class="mdi mdi-file-upload-outline"></span>
          </button>
          <button
            class="btn-action btn-no-style"
            @click="() => openSelectFolder()"
            title="Upload Folder..."
          >
            <span class="mdi mdi-folder-upload-outline"></span>
          </button>
          <button
            class="btn-action btn-no-style"
            :disabled="!enableAction"
            @click="handleDownload"
            title="Download"
          >
            <span class="mdi mdi-file-download-outline"></span>
          </button>

          <div class="split-line"></div>

          <button
            class="btn-action btn-no-style"
            :disabled="!enableAction"
            @click="handleCut"
            title="Cut"
          >
            <span class="mdi mdi-content-cut"></span>
          </button>
          <button
            class="btn-action btn-no-style"
            :disabled="!enableAction"
            @click="handleCopy"
            title="Copy"
          >
            <span class="mdi mdi-content-copy"></span>
          </button>
          <button
            class="btn-action btn-no-style"
            :disabled="!enablePaste"
            @click="handlePaste"
            title="Paste"
          >
            <span class="mdi mdi-content-paste"></span>
          </button>

          <button
            class="btn-action btn-no-style"
            :disabled="selectedItems.length !== 1"
            @click="handleRename"
            title="Rename"
          >
            <span class="mdi mdi-rename"></span>
          </button>
          <button
            class="btn-action btn-no-style"
            :disabled="!enableAction"
            @click="confirmDelete"
            title="Delete"
          >
            <span class="mdi mdi-delete-forever-outline"></span>
          </button>

          <div class="split-line"></div>
        </template>
      </div>
      <div class="action-group">
        <button
          class="btn-action btn-no-style"
          @click="showHidden = !showHidden"
          title="Toggle hidden file visible"
        >
          <template v-if="showHidden">
            <span class="mdi mdi-eye-outline"></span>
          </template>
          <template v-else>
            <span class="mdi mdi-eye-off-outline"></span>
          </template>
        </button>
        <button
          @click="isGridView = !isGridView"
          class="btn-action btn-no-style"
          title="Toggle grid view"
        >
          <template v-if="isGridView">
            <span class="mdi mdi-view-grid-outline"></span>
          </template>
          <template v-else>
            <span class="mdi mdi-view-list-outline"></span>
          </template>
        </button>
        <div class="action-button-wrap">
          <button class="btn-action btn-no-style" title="Toggle Sort" @click="showSortMenu = true">
            <span class="mdi mdi-sort-alphabetical-variant"></span>
          </button>
          <QuickOptions v-model:visible="showSortMenu" :options="sortOptions" />
        </div>

        <template v-if="!selectFileMode || (selectFileMode && multiple)">
          <button
            class="btn-action btn-no-style"
            @click="toggleSelectAll"
            title="Toggle Select All"
          >
            <span class="mdi mdi-check-all"></span>
          </button>
        </template>

        <button
          class="btn-action btn-no-style"
          @click="($event) => handleShowCtxMenu(null, $event)"
          title="Menu"
        >
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </div>
    <div
      ref="explorerContentRef"
      class="explorer-content"
      @click="selectedItems = []"
      @contextmenu.prevent.stop="handleShowCtxMenu(null, $event)"
    >
      <div v-if="!(isGridView || gridView)" class="explorer-list-view">
        <div class="vp-bg file-list-header file-list-row">
          <div class="list-col c-filename" style="padding-left: 24px">Name</div>
          <div class="list-col c-ext">Ext</div>
          <div class="list-col c-size">Size</div>
          <div class="list-col c-time">Last Modified</div>
          <div class="list-col c-time">Created</div>
        </div>

        <FileListItem
          class="selectable"
          :item="item"
          v-for="item in filteredFiles"
          :key="item.name"
          :data-name="item.name"
          :active="selectedItemsSet.has(item)"
          :show-checkbox="allowMultipleSelection"
          @open="(i) => emit('open', i)"
          @select="toggleSelect"
          @contextmenu.prevent.stop="handleShowCtxMenu(item, $event)"
        />
      </div>
      <div v-else class="explorer-grid-view">
        <FileGridItem
          class="selectable"
          :item="item"
          v-for="item in filteredFiles"
          :key="item.name"
          :data-name="item.name"
          :active="selectedItemsSet.has(item)"
          :show-checkbox="allowMultipleSelection"
          @open="(i) => emit('open', i)"
          @select="toggleSelect"
          @contextmenu.prevent.stop="handleShowCtxMenu(item, $event)"
        />
      </div>

      <QuickContextMenu :options="allContextMenu" ref="ctxMenuRef" />
    </div>

    <UploadQueue ref="uploadQueueRef" @complete="emit('refresh')" />
  </div>
</template>

<style lang="scss" scoped>
.explorer-list-wrap {
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.isOverDropZone {
    outline: 2px dashed $primary;
    outline-offset: -3px;
  }

  .explorer-actions {
    padding: 4px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: space-between;
    border: none;
    box-shadow: none;
    border-radius: 0;
    .action-group {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;

      .split-line {
        border-right: 1px solid $color_border;
        margin-left: 2px;
        margin-right: 2px;
      }
      .btn-action {
        display: inline-flex;
        position: relative;
        font-size: 20px;
        border: none;
        padding: 2px 4px;

        .icon-small-abs {
          font-size: 12px;
          position: absolute;
          left: 50%;
          top: 60%;
          transform: translate(-50%, -50%) scale(0.6);
        }
      }
      .action-button-wrap {
        display: inline-flex;
        position: relative;
        z-index: 10;
        .quick-options {
          position: absolute;
          top: 100%;
          right: 0;
          left: unset;
          transform: unset;
          width: 200px;
        }
      }
    }
  }

  .explorer-content {
    flex: 1;
    overflow: auto;
    user-select: none;
  }

  .explorer-list-view {
    .file-list-header {
      font-weight: 500;
      text-transform: capitalize;
      border: 1px solid $color_border;
      border-left: 0;
      border-right: 0;
      position: sticky;
      top: 0;
      padding: 4px 0;
      z-index: 1;
    }

    :deep(.file-list-row) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .list-col {
        padding: 0 5px;
        flex-shrink: 0;
        box-sizing: border-box;
        &.c-icon {
          padding-left: 10px;
          width: 50px;
        }

        &.c-filename {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 200px;
        }

        &.c-type {
          width: 100px;
        }

        &.c-ext {
          width: 50px;
        }
        &.c-size {
          width: 80px;
        }

        &.c-time {
          width: 140px;
        }

        &.c-actions {
          padding-right: 10px;
          display: flex;
          justify-content: flex-end;
          gap: 4px;
          width: 100px;
        }
      }
    }
  }

  :deep(.file-checkbox) {
    &::before {
      // 扩大点击范围
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      content: '';
    }
  }

  .explorer-grid-view {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    flex-wrap: wrap;
    gap: 4px;
  }
}
</style>
