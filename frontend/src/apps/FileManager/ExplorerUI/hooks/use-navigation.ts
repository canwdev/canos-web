import {normalizePath, toggleArrayElement} from '../../utils'
import {useStorage} from '@vueuse/core'
import {LsKeys} from '@/enum'
import {useOpener} from './use-opener'
import {IEntry} from '@server/types/server'

export const useNavigation = ({getListFn}) => {
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

      files.value = (await getListFn()) as unknown as IEntry[]
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
  const goBack = async () => {
    const path = backHistory.value[backHistory.value.length - 2]
    if (!path) {
      return
    }
    backHistory.value.pop()
    addHistory(forwardHistory.value)
    await handleOpenPath(path, false)
  }
  const goForward = async () => {
    const path = forwardHistory.value.pop()
    if (!path) {
      return
    }
    addHistory(backHistory.value, path)
    await handleOpenPath(path, false)
  }
  /* 历史记录功能 END */

  // 是否允许返回上一级
  const allowUp = computed(() => {
    const arr = basePath.value.split('/').filter((i) => !!i)
    if (isUnix.value) {
      return arr.length > 0
    } else {
      return arr.length > 1
    }
  })
  // 检测以/开头的路径为unix路径
  const isUnix = computed(() => {
    return /^\//g.test(basePath.value)
  })
  const goUp = async () => {
    if (!allowUp.value) {
      return
    }
    const arr = basePath.value.split('/').filter((i) => !!i)
    arr.pop()
    if (!arr.length && !isUnix.value) {
      await handleRefresh()
      return
    }
    let path = arr.join('/') + '/'
    if (isUnix.value) {
      path = '/' + path
    }
    await handleOpenPath(path)
  }

  const handleOpenPath = async (path, updateHistory = true) => {
    basePath.value = path
    filterText.value = ''
    await handleRefresh()
    if (updateHistory) {
      addHistory(backHistory.value)
    }
  }
  const {openFile} = useOpener(basePath, isLoading)

  // 打开文件或文件夹
  const handleOpen = async (item: IEntry) => {
    const path = normalizePath(basePath.value + '/' + item.name)
    if (item.isDirectory) {
      await handleOpenPath(path)
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

  return {
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
  }
}
