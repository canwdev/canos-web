import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'
import {useSettingsStore} from '@/store/settings'

export interface TaskbarPinnedItem {
  appid: string
}

export const usePinUnpinned = () => {
  const settingsStore = useSettingsStore()

  const getPinUnpinOption = (appid: string): QuickOptionItem => {
    const isPinned = !!settingsStore.taskbarPinnedAppidMap[appid]
    return {
      label: isPinned ? 'Unpin from taskbar' : 'Pin to taskbar',
      iconClass: isPinned ? 'mdi mdi-pin-off' : 'mdi mdi-pin',
      props: {
        onClick() {
          if (isPinned) {
            settingsStore.unpinFromTaskbar(appid)
          } else {
            settingsStore.pinToTaskbar(appid)
          }
        },
      },
    }
  }

  return {
    getPinUnpinOption,
  }
}
