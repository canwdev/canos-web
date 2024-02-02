import {useMusicStore} from '@/store/music'
import {BackendFileItem, isSupportedMusicFormat} from '@/enum/file'
import {useSystemStore} from '@/store/system'
import {SystemAppMusicPlayer} from '@/apps/app-list'

export const useFileOpener = () => {
  const musicStore = useMusicStore()
  const systemStore = useSystemStore()

  const openFile = (item: BackendFileItem, files?: BackendFileItem[]) => {
    if (isSupportedMusicFormat(item.filename)) {
      systemStore.createTask(SystemAppMusicPlayer)
      setTimeout(() => {
        musicStore.playFromFiles(item, files)
      }, 100)
      return
    }

    console.log('不支持的格式', item)
  }

  return {
    openFile,
  }
}
