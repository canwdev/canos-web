import {IEntry} from '@server/types/server'
import {fsWebApi} from '@/api/filesystem'
import {normalizePath} from '../../utils'
import {useSystemStore} from '@/store/system'
import {isSupportedMediaFormat, regSupportedTextFormat} from '@/utils/is'

export const useOpener = (basePath, isLoading) => {
  const systemStore = useSystemStore()

  const openFileFile = async (item: IEntry) => {
    await fsWebApi.getStream({path: normalizePath(basePath.value + '/' + item.name)})
  }
  const openFileNewTab = async (item: IEntry) => {
    try {
      isLoading.value = true
      window.open(
        await fsWebApi.getStreamShareLink([normalizePath(basePath.value + '/' + item.name)]),
      )
    } finally {
      isLoading.value = false
    }
  }

  const openFile = async (item: IEntry, list: IEntry[]) => {
    if (isSupportedMediaFormat(item.name)) {
      systemStore.createTaskById('os.media-player', {item, list, basePath: basePath.value})
      return
    }

    if (regSupportedTextFormat.test(item.name)) {
      systemStore.createTaskById('os.text-editor', {item, basePath: basePath.value})
      return
    }
    await openFileNewTab(item)
    // if (Number(item.size) > 50 * 1024 * 1024) {
    //   window.$message.error('文件大于50MB，不支持预览，请下载！')
    //   return
    // }
    //
    // console.log('不支持的格式', item)
  }

  return {
    openFile,
  }
}
