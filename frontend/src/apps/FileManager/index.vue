<script lang="ts">
export default {
  name: 'FileManager',
}
</script>
<script setup lang="ts">
import FileSidebar from './FileSidebar.vue'
import {fsWebApi} from '@/api/filesystem'
import FileList from './ExplorerUI/FileList.vue'
import {getLastDirName, normalizePath, toggleArrayElement} from './utils'
import {useNavigation} from './ExplorerUI/hooks/use-navigation'
import {IEntry} from '@server/types/server'

type AppParams = {
  path: string
}

const props = withDefaults(
  defineProps<{
    appParams?: AppParams
    // 是否文件(夹)选择器
    selectFileMode?: 'file' | 'folder'
    // 文件选择器允许多选
    multiple?: boolean
    // 只展示内容
    contentOnly?: boolean
  }>(),
  {
    multiple: false,
    contentOnly: false,
  },
)
const emit = defineEmits(['handleSelect', 'cancelSelect'])
const {selectFileMode, multiple} = toRefs(props)

const {
  isLoading,
  filteredFiles,
  handleOpen,
  handleRefresh,
  basePathNormalized,
  starList,
  handleOpenPath,
  backHistory,
  goBack,
  forwardHistory,
  goForward,
  allowUp,
  goUp,
  basePath,
  toggleStar,
  isStared,
  filterText,
} = useNavigation({
  getListFn: async () => {
    const res = await fsWebApi.getList({
      path: basePath.value,
    })
    // console.log(res)

    return res
  },
})

// 应用启动传参
watch(
  () => props.appParams,
  () => {
    if (!props.appParams) {
      return
    }
    const {path} = props.appParams
    if (path) {
      handleOpenPath(path)
    }
  },
  {immediate: true},
)

const fileSidebarRef = ref()
onMounted(async () => {
  if (fileSidebarRef.value) {
    await fileSidebarRef.value.handleRefresh()
    if (!props.appParams?.path) {
      fileSidebarRef.value.openFirstDrive()
    }
  }
})

const handleOpenWrap = (item: IEntry) => {
  if (selectFileMode.value === 'file' && !item.isDirectory) {
    emit('handleSelect', {items: [item], item, basePath: fileListRef.value.basePath})
    return
  }
  return handleOpen(item)
}

const fileListRef = ref()
// 是否选中了一个文件夹
const isSelectAFolder = computed(() => {
  let items = fileListRef.value.selectedItems
  if (items.length !== 1) {
    return false
  }
  return items[0].isDirectory
})
// 处理选择操作
const handleSelect = () => {
  let items = fileListRef.value.selectedItems
  // 打开文件夹
  if (isSelectAFolder.value) {
    handleOpen(items[0])
    return
  }
  if (selectFileMode.value === 'folder') {
    emit('handleSelect', {basePath: fileListRef.value.basePath})
  }
  if (!items.length) {
    return
  }
  if (selectFileMode.value === 'file') {
    items = items.filter((i) => !i.isDirectory)
    if (!items.length) {
      return
    }
    emit('handleSelect', {items, item: items[0], basePath: fileListRef.value.basePath})
    return
  }
}
</script>

<template>
  <div class="explorer-wrap">
    <div v-if="!contentOnly" class="explorer-header vp-panel">
      <div class="nav-address">
        <div class="nav-wrap">
          <button
            :disabled="backHistory.length <= 1"
            class="btn-action btn-no-style"
            @click="goBack"
            title="Back"
          >
            <span class="mdi mdi-arrow-left"></span>
          </button>
          <button
            :disabled="forwardHistory.length <= 0"
            class="btn-action btn-no-style"
            @click="goForward"
            title="Forward"
          >
            <span class="mdi mdi-arrow-right"></span>
          </button>
          <button class="btn-action btn-no-style" :disabled="!allowUp" @click="goUp" title="Up">
            <span class="mdi mdi-arrow-up"></span>
          </button>
        </div>
        <div class="input-wrap">
          <input
            placeholder="Path"
            v-model="basePath"
            class="input-addr vp-input"
            @change="handleRefresh"
          />
          <button class="btn-no-style btn-action" @click="handleRefresh">
            <span class="mdi mdi-refresh"></span>
          </button>
          <button class="btn-no-style btn-action" @click="toggleStar">
            <template v-if="isStared">
              <span class="mdi mdi-star"></span>
            </template>
            <template v-else>
              <span class="mdi mdi-star-outline"></span>
            </template>
          </button>

          <input placeholder="Filter name" v-model="filterText" class="input-filter vp-input" />
        </div>
      </div>
    </div>
    <div class="explorer-content-wrap scrollbar-mini">
      <FileSidebar
        ref="fileSidebarRef"
        v-if="!contentOnly"
        @openDrive="(i) => handleOpenPath(i.path)"
        :current-path="basePath"
      >
        <div v-if="starList.length" class="file-sidebar-content star-list">
          <div v-for="(path, index) in starList" :key="path">
            <button
              @click="handleOpenPath(path)"
              class="drive-item btn-no-style"
              :title="path"
              @contextmenu.prevent="() => starList.splice(index, 1)"
            >
              <span class="drive-icon">
                <span class="mdi mdi-star"></span>
              </span>
              <span class="drive-content">
                <span class="drive-title text-overflow"> {{ getLastDirName(path) }}</span>
              </span>
            </button>
          </div>
        </div>
      </FileSidebar>
      <FileList
        ref="fileListRef"
        v-model:is-loading="isLoading"
        :files="filteredFiles"
        @open="handleOpenWrap"
        @refresh="handleRefresh"
        :base-path="basePathNormalized"
        :selectFileMode="selectFileMode"
        :multiple="multiple"
        :content-only="contentOnly"
      />
    </div>

    <!--文件选择器-->
    <div v-if="selectFileMode && fileListRef" class="vp-bg explorer-bottom-wrap">
      <button class="vp-button primary" @click="handleSelect">
        {{ selectFileMode === 'file' || isSelectAFolder ? 'Open' : 'Select Folder' }}
      </button>
      <button class="vp-button" @click="$emit('cancelSelect')">Cancel</button>
    </div>
  </div>
</template>

<style lang="scss">
.explorer-wrap {
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .vp-button {
    line-height: 1;
    min-width: 25px;
    min-height: 25px;
    align-items: center;
    justify-content: center;
  }

  .explorer-header {
    padding: 4px;
    border: none;
    border-bottom: 1px solid $color_border;
    box-shadow: none;
    border-radius: 0;

    .nav-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px;
      .btn-action {
        padding: 4px;
        display: flex;
      }

      .nav-wrap {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .input-wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        flex: 1;
        gap: 4px;
        font-size: 14px;

        .input-addr {
          flex: 1;
          line-height: 1;
          padding: 4px 8px;
        }
        .input-filter {
          width: 100px;
          line-height: 1;
          padding: 4px 8px;
        }
      }
    }
  }

  .star-list {
    height: auto;
    flex: unset;
  }

  .explorer-content-wrap {
    flex: 1;
    overflow: auto;
    display: flex;
  }

  .btn-action {
    display: inline-flex;
    cursor: pointer;
    font-size: 18px;
    &:disabled {
      cursor: not-allowed;
    }
    &:hover {
      background-color: $primary_opacity;
    }
  }

  .explorer-bottom-wrap {
    padding: 8px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}
</style>
