import IconComputer from '@/assets/icons/shell32.dll(16).png'
import IconMusic from '@/assets/icons/shell32.dll(237).png'
import IconBrowser from '@/assets/icons/iexplore.exe(7).png'
import IconSettings from '@/assets/icons/shell32.dll(16826).png'
import IconPiano from '@/assets/icons/icon-piano.png'
import {ShortcutItem} from '@/enum/os'

export const SystemAppSettings: ShortcutItem = {
  appid: 'os.settings',
  title: 'Settings',
  icon: IconSettings,
  winId: 'settings',
  winOptions: {
    top: '100px',
    left: '100px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/components/Apps/SettingsApp/index.vue')),
  singleInstance: true,
}

export const SystemAppExplorer: ShortcutItem = {
  appid: 'os.explorer',
  title: 'Explorer',
  icon: IconComputer,
  winId: 'explorer',
  winOptions: {
    top: '100px',
    left: '100px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/components/Apps/FileManager/index.vue')),
}

export const SystemAppMusicPlayer: ShortcutItem = {
  appid: 'os.music_player',
  title: 'Music Player',
  icon: IconMusic,
  winId: 'music_player',
  component: defineAsyncComponent(() => import('@/components/Apps/MusicPlayer/index.vue')),
  singleInstance: true,
}

export const SystemAppWebBrowser: ShortcutItem = {
  appid: 'os.web_browser',
  title: 'Iframe Browser',
  icon: IconBrowser,
  winId: 'browser',
  winOptions: {
    top: '150px',
    left: '150px',
    width: '800px',
    height: '600px',
  },
  component: defineAsyncComponent(() => import('@/components/Apps/IframeBrowser/index.vue')),
}

export const AppPianoJs: ShortcutItem = {
  appid: 'com.pianojs',
  title: 'Garageband Piano Js',
  icon: IconPiano,
  winId: 'piano',
  winOptions: {
    top: '150px',
    left: '150px',
    width: '620px',
    height: '380px',
  },
  component: defineAsyncComponent(() => import('@/components/Apps/PianoJs/index.vue')),
}

export const SystemAppList: ShortcutItem[] = [SystemAppSettings]
export const AllAppList: ShortcutItem[] = [
  SystemAppExplorer,
  SystemAppMusicPlayer,
  SystemAppWebBrowser,
  AppPianoJs,
  ...SystemAppList,
]
