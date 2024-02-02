<script lang="ts">
import {defineComponent} from 'vue'
import {getList} from '@/api/filesystem'
import {BackendFileItem} from '@/enum/file'
import {useFileOpener} from '@/components/OS/os-hooks'
import FileListItem from './FileListItem.vue'
import {
  ArrowUp20Regular,
  ArrowSync20Filled,
  DocumentAdd20Regular,
  FolderAdd20Regular,
} from '@vicons/fluent'

export default defineComponent({
  name: 'FileManager',
  components: {
    FileListItem,
    ArrowUp20Regular,
    ArrowSync20Filled,
    DocumentAdd20Regular,
    FolderAdd20Regular,
  },
  setup() {
    const files = ref<BackendFileItem[]>([])
    const basePath = ref('/')
    const isLoading = ref(false)

    const handleRefresh = async () => {
      try {
        isLoading.value = true
        if (!basePath.value) {
          basePath.value = '/'
        }
        const res = await getList({
          path: basePath.value,
          getPlayStat: true,
        })
        const list = res.list as BackendFileItem[]

        files.value = list
      } catch (e) {
        console.error(e)
        files.value = []
      } finally {
        isLoading.value = false
      }
    }
    const goUp = () => {
      const arr = basePath.value.split('/').filter((i) => !!i)
      console.log(arr)
      arr.pop()
      if (!arr.length) {
        basePath.value = '/'
        handleRefresh()
        return
      }
      basePath.value = '/' + arr.join('/') + '/'
      handleRefresh()
    }

    onMounted(() => {
      handleRefresh()
    })

    const handleCreateFile = () => {
      // fs.writeFile(
      //   basePath.value + `test_${Date.now()}.txt`,
      //   `Cool, I can do this in the browser!\nDate: ${new Date()}`,
      //   function (err) {
      //     if (err) {
      //       throw err
      //     }
      //   }
      // )
      handleRefresh()
    }
    const handleCreateFolder = () => {
      // fs.mkdirSync(basePath.value + `folder_${Date.now()}`)
      // handleRefresh()
    }

    const {openFile} = useFileOpener()

    const handleFileAction = (type: string, item: BackendFileItem, index: number) => {
      if (type === 'open') {
        if (item.isDirectory) {
          basePath.value += item.filename + '/'
          handleRefresh()
          return
        } else {
          openFile(item, files.value)
        }
        return
      }
      if (type === 'rename') {
        const newName = prompt('input new path', item.filename)
        if (!newName) {
          return
        }
        // fs.renameSync(basePath.value + item.filename, basePath.value + newName)
        handleRefresh()
        return
      }
      if (type === 'delete') {
        const path = basePath.value + item.filename
        if (item.isDirectory) {
          // deleteFolderRecursiveSync(path)
        } else {
          // fs.unlinkSync(path + item.filename)
        }
        handleRefresh()
      }
    }
    return {
      files,
      basePath,
      handleRefresh,
      goUp,
      handleCreateFile,
      handleCreateFolder,
      handleFileAction,
      isLoading,
    }
  },
})
</script>

<template>
  <div class="explorer-wrap">
    <div class="explorer-header">
      <div class="nav-address">
        <div class="nav-wrap">
          <button
            disabled
            class="btn-action vp-button"
            @click="handleCreateFile"
            title="Create Document"
          >
            <n-icon size="16">
              <DocumentAdd20Regular />
            </n-icon>
          </button>
          <button
            disabled
            class="btn-action vp-button"
            @click="handleCreateFolder"
            title="Create Folder"
          >
            <n-icon size="16">
              <FolderAdd20Regular />
            </n-icon>
          </button>
          <!--          <button class="btn-action">Back</button>-->
          <!--          <button class="btn-action">Forward</button>-->
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
            @keyup.enter="handleRefresh"
          />
          <button class="vp-button btn-action" @click="handleRefresh">
            <n-icon size="16"><ArrowSync20Filled /> </n-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="explorer-content _scrollbar_mini">
      <n-space align="center" justify="center" v-if="isLoading">
        <n-spin />
      </n-space>
      <div v-show="!isLoading" class="file-list">
        <div class="file-list-header file-list-row">
          <div class="list-col c-filename">filename</div>
          <!--          <div class="list-col c-type">type</div>-->
          <div class="list-col c-size">size</div>
          <div class="list-col c-time">Create Time</div>
          <div class="list-col c-actions">actions</div>
        </div>
        <FileListItem
          :item="item"
          v-for="(item, index) in files"
          :key="item.id"
          @openFile="handleFileAction('open', item, index)"
          @dblclick="handleFileAction('open', item, index)"
        />

        <div v-if="!files.length" style="text-align: center; padding: 50px">
          This folder is empty
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.explorer-wrap {
  min-width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .explorer-header {
    padding: 0 5px;
    .nav-address {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 0;
      gap: 10px;

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
      }
    }
  }
  .explorer-content {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  .btn-action {
    display: inline-flex;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }

  .file-list {
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

    .file-list-row {
      padding: 10px 0;
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
