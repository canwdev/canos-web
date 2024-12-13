<script setup lang="ts">
import FileList from '@/apps/FileManager/ExplorerUI/FileList.vue'
import {useNavigation} from '@/apps/FileManager/ExplorerUI/hooks/use-navigation'
import {fsWebApi} from '@/api/filesystem'
import {useSystemStore} from '@/store/system'
import {IEntry} from '@server/types/server'
import {normalizePath} from '@/apps/FileManager/utils'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import {SettingsTabType} from '@/enum/settings'
import {useMainStore} from '@/store/main'
import {GlobalEvents, useGlobalBusOn} from '@/utils/bus'
import {ShortcutItem} from '@/enum/os'
const systemStore = useSystemStore()

const {
  isLoading,
  filteredFiles,
  handleOpen,
  handleRefresh,
  basePathNormalized,
  basePath,
  handleOpenPath,
} = useNavigation({
  getListFn: async () => {
    const res = await fsWebApi.getList({
      path: basePath.value,
    })
    // console.log(res)

    return res
  },
})

watch(
  () => systemStore.serverInfo,
  () => {
    if (systemStore.serverInfo && systemStore.serverInfo.dirs) {
      handleOpenPath(systemStore.serverInfo.dirs.dataDesktopPath)
    }
  },
  {immediate: true},
)

const handleOpenWrap = (item: IEntry) => {
  if (item.isDirectory) {
    const path = normalizePath(basePath.value + '/' + item.name)
    systemStore.createTaskById('os.explorer', {path})
    return
  }
  return handleOpen(item)
}

const moreOptions = computed((): QuickOptionItem[] => {
  return [
    {split: true},
    {
      label: 'Widgets',
      iconClass: 'mdi mdi-widgets',
      props: {
        onClick() {
          systemStore.createTaskById('os.settings', {curTab: SettingsTabType.WIDGETS})
        },
      },
    },
    {
      label: 'Personalization',
      iconClass: 'mdi mdi-brush',
      props: {
        onClick() {
          systemStore.createTaskById('os.settings', {curTab: SettingsTabType.PERSONALIZATION})
        },
      },
    },
  ]
})

const fileListRef = ref()

useGlobalBusOn(GlobalEvents.SEND_TO_DESKTOP, (appid) => {
  const shortcutItem: ShortcutItem = systemStore.allAppidMap[appid]
  if (!shortcutItem) {
    window.$message.error('No shortcutItem found')
    return
  }
  fileListRef.value.handleCreateFile(`${appid}.shortcut`, JSON.stringify({}, null, 2))
})
</script>

<template>
  <div ref="rootRef" class="desktop-content" tabindex="0" @keydown="fileListRef.handleShortcutKey">
    <FileList
      ref="fileListRef"
      class="desktop-file-list"
      v-if="systemStore.isBackendAvailable"
      v-model:is-loading="isLoading"
      :files="filteredFiles"
      @open="handleOpenWrap"
      @refresh="handleRefresh"
      :base-path="basePathNormalized"
      :content-only="true"
      grid-view
      :more-options="moreOptions"
      :selectables="['.desktop-file-list .selectable']"
    />
  </div>
</template>

<style lang="scss" scoped>
.desktop-content {
  height: calc(100% - $taskbar_height);
  width: 100%;

  &.preview-desktop {
  }

  .desktop-file-list {
    //user-select: none;
    :deep(.explorer-grid-view) {
      display: grid;
      grid-auto-flow: column;
      height: 100%;
      grid-template-columns: repeat(auto-fill, 74px);
      grid-template-rows: repeat(auto-fill, 70px);
      place-content: flex-start;
      gap: 30px 18px;
    }
  }
  :deep(.file-grid-item) {
    .desktop-icon-image {
      filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
    }
    .desktop-icon-name {
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
    }
  }
}
</style>
