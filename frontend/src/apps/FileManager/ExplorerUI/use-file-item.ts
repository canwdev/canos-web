import {bytesToSize, formatDate} from '@/utils'
import {useExplorerStore} from '../utils/explorer-store'
import {fsWebApi} from '@/api/filesystem'
import explorerBus, {ExplorerEvents} from '../utils/bus'

export const useFileItem = (props) => {
  const {item} = toRefs(props)
  const iconName = computed(() => {
    if (item.value.isDirectory) {
      return 'folder'
    }
    return 'text-x-preview'
  })
  const titleDesc = computed(() => {
    return `Name: ${item.value.name}
Size: ${bytesToSize(item.value.size)}
Type: ${item.value.mimeType || '-'}
Last Modified: ${formatDate(item.value.lastModified, 'YYYY-MM-DD HH:mm:ss')}
Created: ${formatDate(item.value.birthtime, 'YYYY-MM-DD HH:mm:ss')}
`
  })

  return {
    iconName,
    titleDesc,
  }
}

export const useCopyPaste = (getSelectedPaths, basePath, isLoading, emit) => {
  const explorerStore = useExplorerStore()

  const enablePaste = computed(() => {
    return explorerStore.cutPaths.length > 0 || explorerStore.copyPaths.length > 0
  })

  const handleCut = () => {
    explorerStore.copyPaths = []
    explorerStore.cutPaths = getSelectedPaths()
  }

  const handleCopy = () => {
    explorerStore.cutPaths = []
    explorerStore.copyPaths = getSelectedPaths()
  }

  const handlePaste = async () => {
    let paths: string[] = []
    let isMove = false
    if (explorerStore.cutPaths.length) {
      paths = explorerStore.cutPaths
      isMove = true
    } else if (explorerStore.copyPaths.length) {
      paths = explorerStore.copyPaths
    } else {
      return
    }
    // console.log(paths)

    try {
      isLoading.value = true
      await fsWebApi.copyPaste({
        fromPaths: paths,
        toPath: basePath.value,
        isMove,
      })
      if (isMove) {
        explorerStore.cutPaths = []
        explorerBus.emit(ExplorerEvents.REFRESH)
      } else {
        explorerStore.copyPaths = []
        emit('refresh')
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    enablePaste,
    handleCut,
    handleCopy,
    handlePaste,
  }
}
