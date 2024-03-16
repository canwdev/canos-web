<script setup lang="ts">
import {
  ArrowSync20Filled,
  ArrowUp20Regular,
  DocumentAdd20Regular,
  FolderAdd20Regular,
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
import {useFuse} from '@vueuse/integrations/useFuse'

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
const goUp = () => {
  const arr = basePath.value.split('/').filter((i) => !!i)
  // console.log(arr)
  arr.pop()
  if (!arr.length) {
    handleRefresh()
    return
  }
  basePath.value = arr.join('/') + '/'
  handleRefresh()
}
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
    await handleRefresh()
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
    await handleRefresh()
  } finally {
    isLoading.value = false
  }
}
const handleOpenPath = (path) => {
  basePath.value = path
  handleRefresh()
}
const openFileFile = async (item: IEntry) => {
  await fsWebApi.getStream({path: normalizePath(basePath.value + '/' + item.name)})
}
const handleOpen = (item: IEntry) => {
  if (item.isDirectory) {
    basePath.value += '/' + item.name
    handleRefresh()
    return
  } else {
    openFileFile(item)
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
    <div class="explorer-header">
      <div class="nav-address">
        <div class="nav-wrap">
          <button class="btn-action vp-button" @click="handleCreateFile" title="Create Document">
            <n-icon size="16">
              <DocumentAdd20Regular />
            </n-icon>
          </button>
          <button class="btn-action vp-button" @click="handleCreateFolder" title="Create Folder">
            <n-icon size="16">
              <FolderAdd20Regular />
            </n-icon>
          </button>

          <button class="btn-action vp-button" @click="goUp" title="Up">
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
      <FileSidebar @openDrive="(i) => handleOpenPath(i.path)" />
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
    border-bottom: 1px solid $color_border;

    .nav-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
