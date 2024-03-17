<script lang="ts" setup>
import {IEntry} from '@server/types/server'
import FileListItem from '@/apps/FileManager/ExplorerUI/FileListItem.vue'
import {generateTextFile, normalizePath, toggleArrayElement} from '@/apps/FileManager/utils'
import {showInputPrompt} from '@/components/CommonUI/input-prompt'
import {fsWebApi} from '@/api/filesystem'
import {useStorage, useVModel} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {useFileDialog} from '@vueuse/core'
import FileGridItem from '@/apps/FileManager/ExplorerUI/FileGridItem.vue'
import moment from 'moment'
import {
  DocumentAdd16Regular,
  FolderAdd16Regular,
  ArrowUpload16Regular,
  ArrowDownload16Regular,
  Rename16Regular,
  Delete16Regular,
  SelectAllOn24Regular,
  Eye16Filled,
  EyeOff16Filled,
  Grid16Regular,
  AppsList20Regular,
  ArrowSortDownLines16Regular,
} from '@vicons/fluent'
import {useSelectionArea} from '@/hooks/use-selection-area'

const emit = defineEmits(['open', 'update:isLoading', 'refresh'])

interface Props {
  files: IEntry[]
  isLoading: boolean
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {})
const {basePath, files} = toRefs(props)
const isLoading = useVModel(props, 'isLoading', emit)

const showHidden = useStorage(LsKeys.SHOW_HIDDEN_FILES, false)
const filteredFiles = computed(() => {
  return files.value.filter((item) => {
    if (showHidden.value) {
      return true
    }
    return !item.hidden
  })
})

const selectedItems = ref<IEntry[]>([])
const selectedItemsSet = computed(() => {
  return new Set(selectedItems.value)
})
watch(files, () => {
  selectedItems.value = []
})
watch(filteredFiles, () => {
  selectedItems.value = []
})
const enableAction = computed(() => {
  return selectedItems.value.length > 0
})

const handleCreateFile = async () => {
  try {
    const name = await showInputPrompt({
      title: 'Create File',
      value: `file_${moment(new Date()).format('YYYYMMDD_HHmmss')}.txt`,
    })
    isLoading.value = true
    await fsWebApi.createFile({
      path: normalizePath(basePath.value + '/' + name),
      file: generateTextFile('', name),
    })
    emit('refresh')
  } finally {
    isLoading.value = false
  }
}
const handleCreateFolder = async () => {
  try {
    const name = await showInputPrompt({
      title: 'Create Folder',
      value: `folder_${moment(new Date()).format('YYYYMMDD_HHmmss')}`,
    })
    isLoading.value = true
    await fsWebApi.createDir({path: normalizePath(basePath.value + '/' + name)})
    emit('refresh')
  } finally {
    isLoading.value = false
  }
}

/* SELECT START*/
const explorerContentRef = ref()
useSelectionArea({
  containerRef: explorerContentRef,
  onStart: () => {
    selectedItems.value = []
  },
  onStop: (stored) => {
    const map = {}
    filteredFiles.value.forEach((i) => {
      map[i.name] = i
    })
    const list: IEntry[] = []
    stored.forEach((el) => {
      const name = el.getAttribute('data-name')
      if (!name) {
        return
      }
      if (map[name]) {
        list.push(map[name])
      }
    })

    selectedItems.value = list
  },
})
const toggleSelect = ({item, event}) => {
  if (event.ctrlKey || event.metaKey) {
    // 使用ctrl键多选
    selectedItems.value = toggleArrayElement([...selectedItems.value], item)
  } else if (event.shiftKey) {
    // 使用shift键选择范围
    let idx = 0
    const first = selectedItems.value[0]
    if (first) {
      idx = filteredFiles.value.findIndex((i) => i.name === first.name)
    }
    let itemIdx = filteredFiles.value.findIndex((i) => i.name === item.name)
    if (idx > itemIdx) {
      // 使最小的index在最前
      ;[itemIdx, idx] = [idx, itemIdx]
    }
    selectedItems.value = filteredFiles.value.slice(idx, itemIdx + 1)
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
  console.log(selectedItems.value)
}
/* SELECT END*/

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
    let paths: string[] = []
    for (const itemsKey in selectedItems.value) {
      const item = selectedItems.value[itemsKey]
      paths.push(normalizePath(basePath.value + '/' + item.name))
    }

    const {key} = (await fsWebApi.createShareLink({
      paths,
    })) as unknown as any
    window.open(fsWebApi.getDownloadShareLink({key}))
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
        |
        <button class="vp-button" @click="() => openSelectFiles()" title="Upload">
          <n-icon size="16">
            <ArrowUpload16Regular />
          </n-icon>
        </button>
        <button
          class="vp-button"
          :disabled="!enableAction"
          @click="handleDownload"
          title="Download"
        >
          <n-icon size="16">
            <ArrowDownload16Regular />
          </n-icon>
        </button>
        |
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
        |
        <button class="vp-button" @click="toggleSelectAll" title="Toggle Select All">
          <n-icon size="16">
            <SelectAllOn24Regular />
          </n-icon>
        </button>
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
        <button class="vp-button" title="Toggle Sort">
          <n-icon size="16">
            <ArrowSortDownLines16Regular />
          </n-icon>
        </button>
      </div>
    </div>
    <div ref="explorerContentRef" class="explorer-content" @click="selectedItems = []">
      <div v-if="!isGridView" class="explorer-list-view">
        <div class="file-list-header file-list-row">
          <div class="list-col c-filename">Name</div>
          <div class="list-col c-size">Size</div>
          <div class="list-col c-time">Last Modified</div>
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
        />
      </div>
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
    border: none;
    box-shadow: none;
    border-radius: 0;
    .action-group {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      .vp-button {
        display: inline-flex;
        padding: 4px 6px;
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
