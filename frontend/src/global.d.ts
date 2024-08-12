import {MessageApiInjection} from 'naive-ui/es/message/src/MessageProvider'
import {DialogApiInjection} from 'naive-ui/es/dialog/src/DialogProvider'
import VueRouter, {Route} from 'vue-router'
import {ShortcutItem} from '@/enum/os'

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
