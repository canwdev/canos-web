import {MessageApiInjection} from 'naive-ui/es/message/src/MessageProvider'
import {DialogApiInjection} from 'naive-ui/es/dialog/src/DialogProvider'
import {NotificationApiInjection} from 'naive-ui/es/notification/src/NotificationProvider'
import VueRouter, {Route} from 'vue-router'
import {ShortcutItem} from '@/enum/os'

declare global {
  interface Window {
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection
    $loadingBar: LoadingBarApiInjection
    electronAPI: any
    $appList: ShortcutItem[]
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
  }
}
