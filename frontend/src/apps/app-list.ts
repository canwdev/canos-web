import {ShortcutItem} from '@/enum/os'
import {handleAssetsUrl} from '@/utils/vite-utils'

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

export const SystemAppList: ShortcutItem[] = [SystemAppSettings]
export const AllAppList: ShortcutItem[] = [
  SystemAppExplorer,
  SystemAppMusicPlayer,
  SystemAppWebBrowser,
  AppPianoJs,
  AppMediadevicesPlayer,
  ...SystemAppList,
]
