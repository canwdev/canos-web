import {IEntry} from '@server/types/server'
import {fsWebApi} from '@/api/filesystem'
import {normalizePath} from '@/apps/FileManager/utils/index'
import {useSystemStore} from '@/store/system'
import {isSupportedMusicFormat} from '@/utils/is'

export const useOpener = (basePath, isLoading) => {
  const systemStore = useSystemStore()

  const openFileFile = async (item: IEntry) => {
    await fsWebApi.getStream({path: normalizePath(basePath.value + '/' + item.name)})
  }
  const openFileNewTab = async (item: IEntry) => {
    try {
      isLoading.value = true
      await fsWebApi.getStream({path: normalizePath(basePath.value + '/' + item.name)})
      const {key} = (await fsWebApi.createShareLink({
        paths: [normalizePath(basePath.value + '/' + item.name)],
      })) as unknown as any
      window.open(fsWebApi.getStreamShareLink(key))
    } finally {
      isLoading.value = false
    }
  }

  const openFile = async (item: IEntry, list: IEntry[]) => {
    if (isSupportedMusicFormat(item.name)) {
      systemStore.createTaskById('os.music_player', {item, list, basePath: basePath.value})
      return
    }

    console.log('不支持的格式', item)
    await openFileNewTab(item)
  }

  return {
    openFile,
  }
}
