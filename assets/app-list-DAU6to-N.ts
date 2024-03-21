import {ShortcutItem} from '@/enum/os'
import {handleAssetsUrl} from '@/utils/vite-utils'
import {guid} from '@/utils'

export const SystemAppSettings: ShortcutItem = {
  appid: 'os.settings',
  title: 'Settings',
  icon: handleAssetsUrl('@/assets/icons/shell32.dll(16826).png'),
  winId: 'settings',
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
  icon: handleAssetsUrl('@/assets/icons/shell32.dll(16).png'),
  winId: 'explorer',
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
  icon: handleAssetsUrl('@/assets/icons/shell32.dll(237).png'),
  winId: 'music_player',
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
  icon: handleAssetsUrl('@/assets/icons/iexplore.exe(7).png'),
  winId: 'browser',
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
  icon: handleAssetsUrl('@/assets/icons/icon-piano.png'),
  winId: 'piano',
  component: defineAsyncComponent(() => import('@/apps/PianoJs/index.vue')),
}

export const AppMediadevicesPlayer: ShortcutItem = {
  appid: 'com.mediadevices-player',
  title: 'Webcam',
  icon: handleAssetsUrl('@/assets/icons/icon-camera.png'),
  winId: 'mediadevices-player',
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
  icon: handleAssetsUrl('@/assets/icons/everything.png'),
  winId: 'quick-launch',
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
    icon: handleAssetsUrl('@/assets/icons/shell32.dll(3).png'),
    // winId: '',
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
    icon: handleAssetsUrl('@/assets/icons/chrome.png'),
    // winId: '',
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
