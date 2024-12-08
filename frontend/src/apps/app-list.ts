import {ShortcutItem} from '@/enum/os'
import {AppUtilsList} from '@/apps/AppUtils'

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
  winOptions: {
    width: '800px',
    height: '400px',
  },
  component: defineAsyncComponent(() => import('@/apps/PianoJs/index.vue')),
}

export const AppRemote: ShortcutItem = {
  appid: 'com.canwdev.remote',
  title: 'RemoteApp',
  iconClass: 'mdi mdi-console',
  component: defineAsyncComponent(() => import('@/apps/RemoteApp/TerminalApp.vue')),
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

export const AllAppList: ShortcutItem[] = [
  SystemAppExplorer,
  SystemAppMediaPlayer,
  SystemAppTextEditor,
  SystemAppWebBrowser,
  SystemAppSettings,
  AppPianoJs,
  AppRemote,
  AppMediadevicesPlayer,
  ...AppUtilsList,
]

window.$appList = AllAppList
