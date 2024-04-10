<script lang="ts" setup>
import {IEntry, SortType} from '@server/types/server'
import FileListItem from './FileListItem.vue'
import {generateTextFile, normalizePath, toggleArrayElement} from '../utils'
import {showInputPrompt} from '@/components/CommonUI/input-prompt'
import {fsWebApi} from '@/api/filesystem'
import {useDropZone, useStorage, useVModel} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {useFileDialog} from '@vueuse/core'
import FileGridItem from './FileGridItem.vue'
import moment from 'moment'
import {
  DocumentAdd16Regular,
  FolderAdd16Regular,
  DocumentArrowUp16Regular,
  FolderArrowUp16Regular,
  DocumentArrowDown16Regular,
  Rename16Regular,
  Delete16Regular,
  SelectAllOn24Regular,
  Eye16Filled,
  EyeOff16Filled,
  Grid16Regular,
  AppsList20Regular,
  ArrowSortDownLines16Regular,
  Cut20Regular,
  Copy20Regular,
  ClipboardPaste20Regular,
} from '@vicons/fluent'
import QuickOptions from '@/components/CommonUI/QuickOptions/index.vue'
import QuickContextMenu from '@/components/CommonUI/QuickOptions/utils/QuickContextMenu.vue'
import UploadQueue from '../UploadQueue.vue'
import {useCopyPaste} from './hooks/use-copy-paste'
import {ExplorerEvents, useExplorerBusOn} from '../utils/bus'
import {useLayoutSort} from './hooks/use-layout-sort'
import {useSelection} from './hooks/use-selection'
import {useFileActions} from './hooks/use-file-actions'
import {useTransfer} from './hooks/use-transfer'

const emit = defineEmits(['open', 'update:isLoading', 'refresh'])

interface Props {
  files: IEntry[]
  isLoading: boolean
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {})
const {basePath, files} = toRefs(props)
const isLoading = useVModel(props, 'isLoading', emit)
useExplorerBusOn(ExplorerEvents.REFRESH, () => emit('refresh'))

// 布局和排序方式
const {isGridView, showSortMenu, sortOptions, filteredFiles, showHidden} = useLayoutSort(files)

// 文件选择功能
const {
  selectedItems,
  selectedItemsSet,
  explorerContentRef,
  toggleSelect,
  toggleSelectAll,
  selectedPaths,
} = useSelection({filteredFiles, basePath})

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
</script>

<template>
  <div ref="dropZoneRef" :class="{isOverDropZone}" class="explorer-list-wrap" @contextmenu.prevent>
    <transition name="fade">
      <div class="os-loading-container _absolute" v-if="isLoading">
        <n-spin />
      </div>
    </transition>

    <div class="explorer-actions vp-panel">
      <div class="action-group">
        <button class="vp-button" @click="handleCreateFile" title="Create Document">
          <n-icon size="16">
            <DocumentAdd16Regular />
          </n-icon>
        </button>
        <button class="vp-button" @click="handleCreateFolder" title="Create Folder">
          <n-icon size="16">
            <FolderAdd16Regular />
          </n-icon>
        </button>

        <div class="split-line"></div>

        <button class="vp-button" @click="() => openSelectFiles()" title="Upload Files">
          <n-icon size="16">
            <DocumentArrowUp16Regular />
          </n-icon>
        </button>
        <button class="vp-button" @click="() => openSelectFolder()" title="Upload Folder">
          <n-icon size="16">
            <FolderArrowUp16Regular />
          </n-icon>
        </button>
        <button
          class="vp-button"
          :disabled="!enableAction"
          @click="handleDownload"
          title="Download"
        >
          <n-icon size="16">
            <DocumentArrowDown16Regular />
          </n-icon>
        </button>

        <div class="split-line"></div>

        <button class="vp-button" :disabled="!enableAction" @click="handleCut" title="Cut">
          <n-icon size="16">
            <Cut20Regular />
          </n-icon>
        </button>
        <button class="vp-button" :disabled="!enableAction" @click="handleCopy" title="Copy">
          <n-icon size="16">
            <Copy20Regular />
          </n-icon>
        </button>
        <button class="vp-button" :disabled="!enablePaste" @click="handlePaste" title="Paste">
          <n-icon size="16">
            <ClipboardPaste20Regular />
          </n-icon>
        </button>

        <button
          class="vp-button"
          :disabled="selectedItems.length !== 1"
          @click="handleRename"
          title="Rename"
        >
          <n-icon size="16">
            <Rename16Regular />
          </n-icon>
        </button>
        <button class="vp-button" :disabled="!enableAction" @click="confirmDelete" title="Delete">
          <n-icon size="16">
            <Delete16Regular />
          </n-icon>
        </button>

        <div class="split-line"></div>
      </div>
      <div class="action-group">
        <button
          class="vp-button"
          @click="showHidden = !showHidden"
          title="Toggle hidden file visible"
        >
          <n-icon size="16">
            <Eye16Filled v-if="showHidden" />
            <EyeOff16Filled v-else />
          </n-icon>
        </button>
        <button @click="isGridView = !isGridView" class="vp-button" title="Toggle grid view">
          <n-icon size="16">
            <Grid16Regular v-if="isGridView" />
            <AppsList20Regular v-else />
          </n-icon>
        </button>
        <div class="action-button-wrap">
          <button class="vp-button" title="Toggle Sort" @click="showSortMenu = true">
            <n-icon size="16">
              <ArrowSortDownLines16Regular />
            </n-icon>
          </button>
          <QuickOptions v-model:visible="showSortMenu" :options="sortOptions" />
        </div>

        <button class="vp-button" @click="toggleSelectAll" title="Toggle Select All">
          <n-icon size="16">
            <SelectAllOn24Regular />
          </n-icon>
        </button>
      </div>
    </div>
    <div
      ref="explorerContentRef"
      class="explorer-content"
      @click="selectedItems = []"
      @contextmenu.prevent.stop="handleShowCtxMenu(null, $event)"
    >
      <div v-if="!isGridView" class="explorer-list-view">
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
          @open="(i) => emit('open', i)"
          @select="toggleSelect"
          @contextmenu.prevent.stop="handleShowCtxMenu(item, $event)"
        />
      </div>

      <QuickContextMenu :options="ctxMenuOptions" ref="ctxMenuRef" />
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
      .vp-button {
        display: inline-flex;
        padding: 4px 6px;
      }
      .action-button-wrap {
        display: inline-flex;
        position: relative;
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
      padding: 0 !important;
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
