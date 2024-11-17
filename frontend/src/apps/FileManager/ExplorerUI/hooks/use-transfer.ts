import {useDropZone, useFileDialog} from '@vueuse/core'
import {normalizePath} from '../../utils'
import {fsWebApi} from '@/api/filesystem'

export const useTransfer = ({basePath, isLoading, selectedItems}) => {
  const uploadFiles = async (files: File[] | FileList | null) => {
    if (!files) {
      return
    }
    // @ts-ignore
    for (const file of files) {
      uploadQueueRef.value.addTask({
        name: file.name,
        path: normalizePath(basePath.value + '/' + file.name),
        file,
      })
    }
  }

  const {open: selectUploadFiles, onChange: onSelectFiles} = useFileDialog({
    multiple: true,
    reset: true,
  })
  const uploadQueueRef = ref()
  onSelectFiles(async (files) => {
    if (!files) {
      return
    }
    await uploadFiles(files)
    // emit('refresh')
  })

  // 支持递归上传文件夹
  function traverseFileTree(item, path = '') {
    if (item.isFile) {
      // Get file
      item.file((file) => {
        // console.log('File:', {path, file})

        uploadQueueRef.value.addTask({
          name: file.name,
          path: normalizePath(basePath.value + '/' + path + file.name),
          file,
        })
      })
    } else if (item.isDirectory) {
      // console.log('Dir', item)
      // Get folder contents
      const dirReader = item.createReader()
      dirReader.readEntries(function (entries) {
        for (let i = 0; i < entries.length; i++) {
          traverseFileTree(entries[i], path + item.name + '/')
        }
      })

      fsWebApi.createDir({
        path: normalizePath(basePath.value + item.fullPath),
        ignoreExisted: true,
      })
    } else {
      // 前两种只有拖拽上传才会触发，这种方式是选择文件夹后触发
      // 选择上传文件夹的弊端是无法上传空文件夹
      // console.warn('normal file', item)

      uploadQueueRef.value.addTask({
        name: item.name,
        path: normalizePath(basePath.value + '/' + item.webkitRelativePath),
        file: item,
      })
    }
  }

  const {
    open: selectUploadFolder,
    reset: resetSelectFolder,
    onChange: onSelectFolder,
  } = useFileDialog({
    directory: true,
    reset: true,
  })
  onSelectFolder(async (filesList) => {
    if (!filesList) {
      return
    }
    // console.log('[onSelectFolder]', filesList)

    for (let i = 0; i < filesList.length; i++) {
      const item = filesList[i]
      if (item) {
        traverseFileTree(item)
      }
    }
  })
  const handleDownload = async () => {
    try {
      isLoading.value = true
      const paths: string[] = []
      for (const itemsKey in selectedItems.value) {
        const item = selectedItems.value[itemsKey]
        paths.push(normalizePath(basePath.value + '/' + item.name))
      }

      window.open(fsWebApi.getDownloadShareLink(paths))
    } finally {
      isLoading.value = false
    }
  }
  const dropZoneRef = ref<HTMLDivElement>()
  const {isOverDropZone} = useDropZone(dropZoneRef, {
    onDrop: (files, event) => {
      const items = event.dataTransfer?.items || []
      // console.log(items)

      for (let i = 0; i < items.length; i++) {
        // webkitGetAsEntry is where the magic happens
        const item = items[i].webkitGetAsEntry()
        if (item) {
          traverseFileTree(item)
        }
      }
    },
  })

  return {
    uploadQueueRef,
    dropZoneRef,
    isOverDropZone,
    selectUploadFiles,
    selectUploadFolder,
    handleDownload,
  }
}
