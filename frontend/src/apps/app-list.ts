import {ShortcutItem} from '@/enum/os'

export const SystemAppSettings: ShortcutItem = {
  appid: 'os.settings',
  title: 'Settings',
  icon: 'preferences-system',
  winOptions: {
    top: '100px',
    left: '100px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/components/OS/SettingsApp/index.vue')),
  singleInstance: true,
}

export const SystemAppExplorer: ShortcutItem = {
  appid: 'os.explorer',
  title: 'Explorer',
  icon: 'system-file-manager',
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
  appid: 'os.media_player',
  title: 'Media Player',
  icon: 'multimedia-audio-player',
  winOptions: {
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/MusicPlayer/index.vue')),
  requireBackend: true,
}

export const SystemAppTextEditor: ShortcutItem = {
  appid: 'os.text_editor',
  title: 'Text Editor',
  icon: '',
  winOptions: {
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/TextEditor/index.vue')),
  requireBackend: true,
}

export const SystemAppWebBrowser: ShortcutItem = {
  appid: 'os.web_browser',
  title: 'Iframe Browser',
  icon: 'web-browser',
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
  icon: 'piano',
  component: defineAsyncComponent(() => import('@/apps/PianoJs/index.vue')),
}

export const AppMediadevicesPlayer: ShortcutItem = {
  appid: 'com.mediadevices-player',
  title: 'Webcam',
  icon: 'camera-web',
  winOptions: {
    top: '150px',
    left: '150px',
    width: '620px',
    height: '380px',
  },
  component: defineAsyncComponent(() => import('@/apps/MediadevicesPlayer/App.vue')),
}

const defineDemoApp = (title = 'App', component): ShortcutItem => {
  return {
    appid: title,
    title,
    icon: 'application-default-icon',
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
    icon: 'applications-internet',
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
  SystemAppTextEditor,
  SystemAppWebBrowser,
  SystemAppSettings,
  AppPianoJs,
  AppMediadevicesPlayer,
  {
    appid: 'os.calc',
    title: '简易计算器',
    icon: 'accessories-calculator',
    winOptions: {
      width: '348px',
      height: '530px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/SimpleCalculator.vue')),
    singleInstance: false,
  },
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
  {
    appid: 'os.colorful-screen',
    title: '多彩屏幕 (屏幕坏点测试)',
    icon: 'video-display',
    winOptions: {
      width: '300px',
      height: '300px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/ColorfulScreen.vue')),
    singleInstance: true,
  },
  {
    appid: 'os.wakelock',
    title: '唤醒锁定',
    icon: 'preferences-system-power',
    winOptions: {
      width: '428px',
      height: '200px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/WakeLock.vue')),
    singleInstance: true,
  },
  defineDemoApp(
    '屏幕时钟',
    defineAsyncComponent(() => import('@/apps/AppUtils/ScreenClock/index.vue')),
  ),
  defineWebApp('Bing', 'https://bing.com'),
]

window.$appList = AllAppList
