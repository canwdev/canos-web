import {MessageApiInjection} from 'naive-ui/es/message/src/MessageProvider'
import {DialogApiInjection} from 'naive-ui/es/dialog/src/DialogProvider'
import {NotificationApiInjection} from 'naive-ui/es/notification/src/NotificationProvider'
import VueRouter, {Route} from 'vue-router'

declare global {
  interface Window {
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection
    $loadingBar: LoadingBarApiInjection
    electronAPI: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
  }
}
