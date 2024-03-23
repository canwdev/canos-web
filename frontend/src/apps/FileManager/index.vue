<script setup lang="ts">
import {
  ArrowSync20Filled,
  ArrowUp20Regular,
  ArrowLeft20Regular,
  ArrowRight20Regular,
  Star20Filled,
  Star20Regular,
} from '@vicons/fluent'
import FileSidebar from '@/apps/FileManager/FileSidebar.vue'
import {IEntry} from '@server/types/server'
import {fsWebApi} from '@/api/filesystem'
import FileList from '@/apps/FileManager/ExplorerUI/FileList.vue'
import {showInputPrompt} from '@/components/CommonUI/input-prompt'
import moment from 'moment/moment'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {
  generateTextFile,
  getLastDirName,
  normalizePath,
  toggleArrayElement,
} from '@/apps/FileManager/utils'
import {useOpener} from '@/apps/FileManager/utils/use-opener'
import {isSupportedMusicFormat} from '@/utils/is'

const files = ref<IEntry[]>([])
const basePath = ref('/')
const basePathNormalized = computed(() => {
  let path = normalizePath(basePath.value)
  if (!/\/$/gi.test(path)) {
    path += '/'
  }
  return path
})
const isLoading = ref(false)

const handleRefresh = async () => {
  try {
    basePath.value = basePathNormalized.value
    isLoading.value = true
    if (!basePath.value) {
      basePath.value = '/'
    }

    const res = await fsWebApi.getList({
      path: basePath.value,
    })

    files.value = res as unknown as IEntry[]
  } catch (e) {
    console.error(e)
    files.value = []
  } finally {
    isLoading.value = false
  }
}

/* 历史记录功能 START */
const backHistory = ref<string[]>([])
const forwardHistory = ref<string[]>([])
const addHistory = (list: string[], path = basePathNormalized.value) => {
  const last = list[list.length - 1]
  if (!last || (last && last !== path)) {
    list.push(path)
  }
}
const goBack = () => {
  const path = backHistory.value[backHistory.value.length - 2]
  if (!path) {
    return
  }
  backHistory.value.pop()
  addHistory(forwardHistory.value)
  handleOpenPath(path, false)
}
const goForward = () => {
  const path = forwardHistory.value.pop()
  if (!path) {
    return
  }
  addHistory(backHistory.value, path)
  handleOpenPath(path, false)
}
/* 历史记录功能 END */

const allowUp = computed(() => {
  const arr = basePath.value.split('/').filter((i) => !!i)
  return arr.length > 0
})
const goUp = () => {
  // 检测以/开头的路径为unix路径
  const isUnix = /^\//g.test(basePath.value)
  const arr = basePath.value.split('/').filter((i) => !!i)
  console.log(arr)
  arr.pop()
  if (!arr.length && !isUnix) {
    handleRefresh()
    return
  }
  let path = arr.join('/') + '/'
  if (isUnix) {
    path = '/' + path
  }
  handleOpenPath(path)
}
const handleOpenPath = (path, updateHistory = true) => {
  basePath.value = path
  filterText.value = ''
  handleRefresh()
  if (updateHistory) {
    addHistory(backHistory.value)
  }
}

const {openFile} = useOpener(basePath, isLoading)

const handleOpen = (item: IEntry) => {
  if (item.isDirectory) {
    handleOpenPath((basePath.value += '/' + item.name))
    return
  } else {
    openFile(item, filteredFiles.value)
  }
}

const starList = useStorage<string[]>(LsKeys.STARED_PATH, [])
const isStared = computed(() => {
  return starList.value.includes(basePathNormalized.value)
})
const toggleStar = () => {
  starList.value = toggleArrayElement([...starList.value], basePathNormalized.value)
}

const filterText = ref('')
const filteredFiles = computed(() => {
  const search = filterText.value.toLowerCase()
  return files.value.filter((item) => item.name.toLowerCase().includes(search))
})
</script>

<template>
  <div class="explorer-wrap">
    <div class="explorer-header vp-panel">
      <div class="nav-address">
        <div class="nav-wrap">
          <button
            :disabled="backHistory.length <= 1"
            class="btn-action vp-button"
            @click="goBack"
            title="Back"
          >
            <n-icon size="16">
              <ArrowLeft20Regular />
            </n-icon>
          </button>
          <button
            :disabled="forwardHistory.length <= 0"
            class="btn-action vp-button"
            @click="goForward"
            title="Forward"
          >
            <n-icon size="16">
              <ArrowRight20Regular />
            </n-icon>
          </button>
          <button class="btn-action vp-button" :disabled="!allowUp" @click="goUp" title="Up">
            <n-icon size="16">
              <ArrowUp20Regular />
            </n-icon>
          </button>
        </div>
        <div class="input-wrap">
          <input
            placeholder="Path"
            v-model="basePath"
            class="input-addr vp-input"
            @change="handleRefresh"
          />
          <button class="vp-button btn-action" @click="handleRefresh">
            <n-icon size="16"><ArrowSync20Filled /> </n-icon>
          </button>
          <button class="vp-button btn-action" @click="toggleStar">
            <n-icon size="16">
              <Star20Filled v-if="isStared" />
              <Star20Regular v-else />
            </n-icon>
          </button>

          <input placeholder="Filter name" v-model="filterText" class="input-filter vp-input" />
        </div>
      </div>

      <div v-if="starList.length" class="star-list">
        <div v-for="path in starList" :key="path">
          <button @click="handleOpenPath(path)" class="vp-button" :title="path">
            {{ getLastDirName(path) }}
          </button>
        </div>
      </div>
    </div>
    <div class="explorer-content-wrap _scrollbar_mini">
      <FileSidebar @openDrive="(i) => handleOpenPath(i.path)" :current-path="basePath" />
      <FileList
        v-model:is-loading="isLoading"
        :files="filteredFiles"
        @open="handleOpen"
        @refresh="handleRefresh"
        :base-path="basePathNormalized"
      />
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

        .input-addr {
          flex: 1;
        }
        .input-filter {
          width: 100px;
        }
      }
    }

    .star-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
  }
  .explorer-content-wrap {
    flex: 1;
    overflow: auto;
    display: flex;
  }

  .btn-action {
    display: inline-flex;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
}
</style>
