import {showInputPrompt} from '@/components/CanUI/functions/input-prompt'
import moment from 'moment/moment'
import {fsWebApi} from '@/api/filesystem'
import {generateTextFile, normalizePath} from '../../utils'
import {IEntry, SortType} from '@server/types/server'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'

export const useFileActions = ({
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
}) => {
  const handleCreateFile = async () => {
    try {
      const name = await showInputPrompt({
        title: 'Create File',
        value: `file_${moment(new Date()).format('YYYYMMDD_HHmmss')}.txt`,
      })
      isLoading.value = true
      await fsWebApi.uploadFile({
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

      await fsWebApi.deleteEntry({
        path: selectedPaths.value,
      })
    } finally {
      isLoading.value = false
      emit('refresh')
    }
  }
  const confirmDelete = () => {
    window.$dialog
      .confirm(`确认删除？此操作不可撤销`, 'Confirm Delete', {
        type: 'warning',
      })
      .then(() => {
        doDeleteSelected()
      })
      .catch()
  }

  const ctxMenuOptions = computed((): QuickOptionItem[] => {
    if (!selectedItems.value.length) {
      return [
        {label: 'Refresh', props: {onClick: () => emit('refresh')}},
        {label: 'Paste', props: {onClick: handlePaste}, disabled: !enablePaste.value},
      ]
    }
    const isSingle = selectedItems.value.length === 1
    // @ts-ignore
    return [
      isSingle && {
        label: 'Open',
        props: {
          onClick: () => {
            return emit('open', selectedItems.value[0])
          },
        },
      },
      {label: 'Download', props: {onClick: handleDownload}},
      {split: true},
      {label: 'Cut', props: {onClick: handleCut}},
      {label: 'Copy', props: {onClick: handleCopy}},
      {split: true},
      isSingle && {label: 'Rename', props: {onClick: handleRename}},
      {label: 'Delete', props: {onClick: confirmDelete}},
    ].filter(Boolean)
  })
  const ctxMenuRef = ref()
  const handleShowCtxMenu = (item: IEntry | null, event: MouseEvent) => {
    if (!item) {
      selectedItems.value = []
    } else {
      if (!selectedItemsSet.value.has(item)) {
        selectedItems.value = [item]
      }
    }
    ctxMenuRef.value.isShow = false
    setTimeout(() => {
      ctxMenuRef.value.showMenu(event)
    })
  }
  const enableAction = computed(() => {
    return selectedItems.value.length > 0
  })
  return {
    handleCreateFile,
    handleCreateFolder,
    handleRename,
    doDeleteSelected,
    confirmDelete,
    ctxMenuOptions,
    ctxMenuRef,
    handleShowCtxMenu,
    enableAction,
  }
}
