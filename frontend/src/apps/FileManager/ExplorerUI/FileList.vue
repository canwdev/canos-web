<script lang="ts" setup>
import {IEntry} from '@server/types/server'
import FileListItem from '@/apps/FileManager/ExplorerUI/FileListItem.vue'
import {normalizePath, toggleArrayElement} from '@/apps/FileManager/utils'
import {showInputPrompt} from '@/components/CommonUI/input-prompt'
import {fsWebApi} from '@/api/filesystem'
import {useStorage, useVModel} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {useFileDialog} from '@vueuse/core'
import * as fs from 'fs'

const emit = defineEmits(['open', 'update:isLoading', 'refresh'])

interface Props {
  files: IEntry[]
  isLoading: boolean
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {})
const {basePath, files} = toRefs(props)
const isLoading = useVModel(props, 'isLoading', emit)

const selectedItems = ref<IEntry[]>([])
const selectedItemsSet = computed(() => {
  return new Set(selectedItems.value)
})
watch(files, () => {
  selectedItems.value = []
})
const enableAction = computed(() => {
  return selectedItems.value.length > 0
})

const toggleSelect = ({item, event}) => {
  if (event.ctrlKey || event.metaKey) {
    selectedItems.value = toggleArrayElement([...selectedItems.value], item)
  } else {
    selectedItems.value = [item]
  }
}
const toggleSelectAll = () => {
  const allFiles = filteredFiles.value
  if (selectedItems.value.length === allFiles.length) {
    selectedItems.value = []
  } else {
    selectedItems.value = [...allFiles]
  }
}

const handleRename = async () => {
  try {
    const item: IEntry = selectedItems.value[0]
    const name = await showInputPrompt({
      title: 'Rename',
      value: item.name,
    })
    isLoading.value = true
    await fsWebApi.renameEntry({
      fromPath: normalizePath(basePath.value + '/' + item.name),
      toPath: normalizePath(basePath.value + '/' + name),
    })
    emit('refresh')
  } finally {
    isLoading.value = false
  }
}
const doDeleteSelected = async () => {
  try {
    isLoading.value = true
    for (const itemsKey in selectedItems.value) {
      const item = selectedItems.value[itemsKey]
      await fsWebApi.deleteEntry({
        path: normalizePath(basePath.value + '/' + item.name),
      })
    }
  } finally {
    isLoading.value = false
    emit('refresh')
  }
}
const confirmDelete = () => {
  window.$dialog.warning({
    title: 'Confirm Delete',
    content: `确认删除？此操作不可撤销`,
    positiveText: 'OK',
    negativeText: 'Cancel',
    onPositiveClick: () => {
      doDeleteSelected()
    },
    onNegativeClick: () => {},
  })
}

const showHidden = useStorage(LsKeys.SHOW_HIDDEN_FILES, false)
const filteredFiles = computed(() => {
  return files.value.filter((item) => {
    if (showHidden.value) {
      return true
    }
    return !item.hidden
  })
})

const {
  open: openSelectFiles,
  reset: resetSelectFiles,
  onChange: onSelectFiles,
} = useFileDialog({
  multiple: true,
})
onSelectFiles(async (files) => {
  try {
    if (!files) {
      return
    }
    isLoading.value = true
    // @ts-ignore
    for (const file of files) {
      console.log(file)
      await fsWebApi.createFile({
        path: normalizePath(basePath.value + '/' + file.name),
        file,
      })
    }
    emit('refresh')
  } finally {
    isLoading.value = false
    console.log('fin')
  }
})

const handleDownload = async () => {
  try {
    isLoading.value = true
    let path: string | string[] = []

    if (selectedItems.value.length === 1) {
      path = normalizePath(basePath.value + '/' + selectedItems.value[0].name)
    } else {
      for (const itemsKey in selectedItems.value) {
        const item = selectedItems.value[itemsKey]
        path.push(normalizePath(basePath.value + '/' + item.name))
      }
    }

    await fsWebApi.downloadEntry({
      path,
    })
  } finally {
    isLoading.value = false
  }
}

const isGridView = useStorage(LsKeys.EXPLORER_IS_GRID_VIEW, false)
const sortMode = useStorage(LsKeys.EXPLORER_SORT_MODE, '')
</script>

<template>
  <div class="explorer-list-wrap">
    <transition name="fade">
      <div class="os-loading-container _absolute" v-if="isLoading">
        <n-spin />
      </div>
    </transition>

    <div class="explorer-actions">
      <div class="action-group">
        <button class="vp-button" @click="openSelectFiles">上传</button>
        <button class="vp-button" :disabled="!enableAction" @click="handleDownload">下载</button>
        |
        <button class="vp-button" :disabled="selectedItems.length !== 1" @click="handleRename">
          重命名
        </button>
        <button class="vp-button" :disabled="!enableAction" @click="confirmDelete">删除</button>
        |
        <button class="vp-button" @click="toggleSelectAll">全选</button>
      </div>
      <div class="action-group">
        <button class="vp-button" @click="showHidden = !showHidden">
          {{ showHidden ? '显示' : '不显示' }}
        </button>
        <button class="vp-button">视图</button>
        <button class="vp-button">排序</button>
      </div>
    </div>
    <div class="explorer-list" @click="selectedItems = []">
      <div class="file-list-header file-list-row">
        <div class="list-col c-filename">Name</div>
        <div class="list-col c-size">Size</div>
        <div class="list-col c-time">Last Modified</div>
      </div>

      <FileListItem
        :item="item"
        v-for="item in filteredFiles"
        :key="item.name"
        :active="selectedItemsSet.has(item)"
        @open="(i) => emit('open', i)"
        @select="toggleSelect"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.explorer-list-wrap {
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .explorer-actions {
    padding: 4px;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: space-between;
    .action-group {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }
  }
  .explorer-list {
    flex: 1;
    overflow: auto;
    .file-list-header {
      font-weight: 500;
      text-transform: capitalize;
      border: 1px solid $color_border;
      border-left: 0;
      border-right: 0;
      position: sticky;
      top: 0;
      background-color: rgba(206, 206, 206, 0.27);
      color: black;
      padding: 0 !important;
    }

    :deep(.file-list-row) {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .list-col {
        padding: 0 5px;
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
}
</style>
