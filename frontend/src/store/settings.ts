import {DesktopBackgroundSize, LdThemeType} from '@/enum/settings'
import {DEFAULT_THEME} from '@/components/CanUI/packages/ViewPortWindow/utils/use-theme'
import {LsKeys} from '@/enum'
import {DEFAULT_ICON_THEME} from '@/components/OS/ThemedIcon/use-icon-themes'
import {TaskbarPinnedItem} from '@/components/OS/TaskBar/types'
import {ShortcutItem} from '@/enum/os'

type IStore = {
  // 明暗主题
  ldTheme: LdThemeType
  // 自定义主题类型
  customTheme: string
  // 图标主题
  iconTheme: string
  // 主题色
  themeColor: string
  // 桌面壁纸 url
  desktopWallpaper: string
  // 桌面壁纸 background-size
  desktopBackgroundSize: DesktopBackgroundSize
  // 桌面背景色
  desktopBgColor: string
  // 禁用动画效果
  disableAnimation: boolean
  // 是否开启窗口模式
  isWindowed: boolean
  // 托盘显示
  taskbarShowFps: boolean
  taskbarShowMemory: boolean
  taskbarShowBattery: boolean
  taskbarShowClock: boolean
  // 任务栏只显示图标
  taskbarIconOnly: boolean
  // 应用自启动appid列表
  appAutoStartIds: string[]
  // 已启用的小组件appid列表
  enabledWidgetIds: string[]
  taskbarPinnedList: TaskbarPinnedItem[]

  startMenuIsAllApps: boolean
}

export const useSettingsStore = defineStore('settingsStore', {
  state: (): IStore => {
    return {
      ldTheme: LdThemeType.SYSTEM,
      customTheme: DEFAULT_THEME,
      iconTheme: DEFAULT_ICON_THEME,
      themeColor: '#0078d4',
      desktopBgColor: '#515c6b',
      disableAnimation: false,
      isWindowed: window.innerWidth > 500,

      taskbarShowFps: false,
      taskbarShowMemory: false,
      taskbarShowBattery: false,
      taskbarShowClock: true,

      taskbarIconOnly: false,
      desktopWallpaper: '',
      desktopBackgroundSize: 'cover',
      appAutoStartIds: [],
      enabledWidgetIds: [],
      taskbarPinnedList: [],

      startMenuIsAllApps: false,
    }
  },
  getters: {
    taskbarPinnedAppidMap() {
      const map: {[appid: string]: TaskbarPinnedItem} = {}
      this.taskbarPinnedList.forEach((item) => {
        map[item.appid] = item
      })
      return map
    },
  },
  actions: {
    pinToTaskbar(appid: string) {
      const idx = this.taskbarPinnedList.findIndex((i) => i.appid === appid)
      if (idx === -1) {
        this.taskbarPinnedList.push({appid: appid})
      }
    },
    unpinFromTaskbar(appid: string) {
      const idx = this.taskbarPinnedList.findIndex((i) => i.appid === appid)
      if (idx > -1) {
        this.taskbarPinnedList.splice(idx, 1)
      }
    },
  },
  persist: {
    key: LsKeys.SETTINGS_STORAGE,
  },
})
