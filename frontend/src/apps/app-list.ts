import {ShortcutItem} from '@/enum/os'
import {getIcon} from '@/utils/vite-utils'

export const SystemAppSettings: ShortcutItem = {
  appid: 'os.settings',
  title: 'Settings',
  icon: getIcon('preferences-system'),
  winOptions: {
    top: '100px',
    left: '100px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/SettingsApp/index.vue')),
  singleInstance: true,
}

export const SystemAppExplorer: ShortcutItem = {
  appid: 'os.explorer',
  title: 'Explorer',
  icon: getIcon('system-file-manager'),
  winOptions: {
    top: '100px',
    left: '100px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/FileManager/index.vue')),
  requireBackend: true,
}

export const SystemAppMusicPlayer: ShortcutItem = {
  appid: 'os.music_player',
  title: 'Music Player',
  icon: getIcon('multimedia-audio-player'),
  winOptions: {
    width: '500px',
    height: '500px',
  },
  component: defineAsyncComponent(() => import('@/apps/MusicPlayer/index.vue')),
  singleInstance: true,
  requireBackend: true,
}

export const SystemAppWebBrowser: ShortcutItem = {
  appid: 'os.web_browser',
  title: 'Iframe Browser',
  icon: getIcon('web-browser'),
  winOptions: {
    top: '150px',
    left: '150px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/IframeBrowser/index.vue')),
}

export const AppPianoJs: ShortcutItem = {
  appid: 'com.pianojs',
  title: 'Garageband Piano Js',
  icon: getIcon('icon-piano'),
  component: defineAsyncComponent(() => import('@/apps/PianoJs/index.vue')),
}

export const AppMediadevicesPlayer: ShortcutItem = {
  appid: 'com.mediadevices-player',
  title: 'Webcam',
  icon: getIcon('camera-web'),
  winOptions: {
    top: '150px',
    left: '150px',
    width: '620px',
    height: '380px',
  },
  component: defineAsyncComponent(() => import('@/apps/MediadevicesPlayer/App.vue')),
}

export const AppQuickLaunch: ShortcutItem = {
  appid: 'os.quick-launch',
  title: 'Quick Launch',
  icon: getIcon('org.xfce.appfinder'),
  winOptions: {
    top: '150px',
    left: '150px',
    width: '400px',
    height: '400px',
  },
  component: defineAsyncComponent(() => import('@/apps/QuickLaunch/index.vue')),
  singleInstance: true,
}

const defineDemoApp = (title = 'App', component): ShortcutItem => {
  return {
    appid: title,
    title,
    icon: getIcon('application-default-icon'),
    winOptions: {
      top: '0px',
      left: '0px',
      width: '480px',
      height: '320px',
    },
    component,
    singleInstance: false,
  }
}
const defineWebApp = (title = 'WebApp', url): ShortcutItem => {
  return {
    appid: title,
    title,
    icon: getIcon('applications-internet'),
    winOptions: {
      top: '150px',
      left: '150px',
      width: '480px',
      height: '320px',
    },
    url,
    singleInstance: false,
  }
}

export const AllAppList: ShortcutItem[] = [
  SystemAppExplorer,
  SystemAppMusicPlayer,
  SystemAppWebBrowser,
  SystemAppSettings,
  AppPianoJs,
  AppMediadevicesPlayer,
  AppQuickLaunch,
  defineDemoApp(
    '简易计算器',
    defineAsyncComponent(() => import('@/apps/AppUtils/SimpleCalculator.vue')),
  ),
  defineDemoApp(
    '计数器',
    defineAsyncComponent(() => import('@/apps/AppUtils/SimpleCounter.vue')),
  ),
  defineDemoApp(
    'ObjectSize',
    defineAsyncComponent(() => import('@/apps/AppUtils/ObjectSizeWrap/index.vue')),
  ),
  defineDemoApp(
    'Live2D',
    defineAsyncComponent(() => import('@/apps/AppUtils/Live2DWrap/index.vue')),
  ),
  defineDemoApp(
    'BouncyBall',
    defineAsyncComponent(() => import('@/apps/AppUtils/Games/BouncyBall/index.vue')),
  ),
  defineDemoApp(
    '多彩屏幕 (屏幕坏点测试)',
    defineAsyncComponent(() => import('@/apps/AppUtils/ColorfulScreen.vue')),
  ),
  defineDemoApp(
    '唤醒锁定',
    defineAsyncComponent(() => import('@/apps/AppUtils/WakeLock.vue')),
  ),
  defineDemoApp(
    '屏幕时钟',
    defineAsyncComponent(() => import('@/apps/AppUtils/ScreenClock/index.vue')),
  ),
  defineWebApp('Bing', 'https://bing.com'),
  defineWebApp('CanOS', location.href),
]

window.$appList = AllAppList
