import {LdThemeType, LoopModeType} from '@/enum/settings'
import {CustomThemeType} from '@/components/CommonUI/ViewPortWindow/enum'

interface IStore {
  // 明暗主题
  ldTheme: LdThemeType
  // 自定义主题类型
  customTheme: CustomThemeType
  // 圆角主题
  enableRoundedTheme: boolean
  // 开启半透明模糊UI
  enableAeroTheme: boolean
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
  taskbarShowBattery: boolean
  taskbarShowClock: boolean
  // 任务栏只显示图标
  taskbarIconOnly: boolean
  // 应用自启动appid列表
  appAutoStartIds: string[]
  // 循环模式
  loopMode: LoopModeType
  // 音量
  audioVolume: number
}

export const useSettingsStore = defineStore('settingsStore', {
  state: (): IStore => {
    return {
      ldTheme: LdThemeType.SYSTEM,
      customTheme: CustomThemeType.DEFAULT,
      enableRoundedTheme: true,
      enableAeroTheme: false,
      themeColor: '#258292',
      desktopBgColor: '#258292',
      disableAnimation: false,
      isWindowed: true,
      taskbarShowFps: true,
      taskbarShowBattery: true,
      taskbarShowClock: true,
      taskbarIconOnly: false,
      desktopWallpaper: '',
      appAutoStartIds: [],
      loopMode: LoopModeType.LOOP_SEQUENCE,
      audioVolume: 100,
    }
  },
  actions: {
    setAudioVolume(value) {
      value = Number(value)

      if (value > 100) {
        value = 100
      }
      if (value < 0) {
        value = 0
      }

      // console.log(value)

      this.audioVolume = value
    },
    volumeUp(step = 5) {
      const volume = this.audioVolume + step
      this.setAudioVolume(volume)
    },
    volumeDown(step = 5) {
      const volume = this.audioVolume - step
      this.setAudioVolume(volume)
    },
  },
  persist: {
    key: 'ls_key_localweb_settings',
  },
})
