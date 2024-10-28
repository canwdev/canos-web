import {LdThemeType} from '@/enum/settings'
import {DEFAULT_THEME} from '@/components/CanUI/packages/ViewPortWindow/utils/use-theme'
import {LsKeys} from '@/enum'
import {DEFAULT_ICON_THEME} from '@/components/OS/ThemedIcon/use-icon-themes'

type IStore = {
  // 明暗主题
  ldTheme: LdThemeType
  // 自定义主题类型
  customTheme: string
  // 图标主题
  iconTheme: string
  // 主题色
  themeColor: string
  // 桌面壁纸url
  desktopWallpaper: string
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
      appAutoStartIds: [],
    }
  },
  persist: {
    key: LsKeys.SETTINGS_STORAGE,
  },
})
