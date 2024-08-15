import VueRouter, {Route} from 'vue-router'
import {ShortcutItem} from '@/enum/os'
import {Message} from 'element-plus'
import {SFCInstallWithContext} from 'element-plus/es/utils'

declare global {
  interface Window {
    $message: SFCInstallWithContext<Message>
    // $notification: NotificationApiInjection
    $dialog: SFCInstallWithContext<ElMessageBox>
    // $loadingBar: LoadingBarApiInjection
    $appList: ShortcutItem[]

    $mcUtils: any
    $qlUtils: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
  }
}
