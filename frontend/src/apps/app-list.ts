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

export const SystemAppMediaPlayer: ShortcutItem = {
  appid: 'os.media-player',
  title: 'Media Player',
  icon: 'multimedia-audio-player',
  winOptions: {
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/MediaPlayer/index.vue')),
  requireBackend: true,
}

export const SystemAppTextEditor: ShortcutItem = {
  appid: 'os.text-editor',
  title: 'Text Editor',
  icon: 'notes',
  winOptions: {
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/apps/TextEditor/index.vue')),
  requireBackend: true,
}

export const SystemAppWebBrowser: ShortcutItem = {
  appid: 'os.web_browser',
  title: 'iFrame',
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

export const RemoteApp: ShortcutItem = {
  appid: 'com.canwdev.remote',
  title: 'RemoteApp',
  icon: 'remote',
  component: defineAsyncComponent(() => import('@/apps/RemoteApp/index.vue')),
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
  SystemAppMediaPlayer,
  SystemAppTextEditor,
  SystemAppWebBrowser,
  SystemAppSettings,
  AppPianoJs,
  RemoteApp,
  AppMediadevicesPlayer,
  {
    appid: 'os.calc',
    title: 'Calculator',
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
  {
    appid: 'os.colorful-screen',
    title: '多彩屏幕 (屏幕坏点测试)',
    icon: 'video-display',
    winOptions: {
      width: '300px',
      height: '300px',
    },
    component: defineAsyncComponent(() => import('@/apps/AppUtils/ColorfulScreen.vue')),
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

  defineWebApp('Google', 'https://www.google.com/webhp?igu=1'),
]

window.$appList = AllAppList
