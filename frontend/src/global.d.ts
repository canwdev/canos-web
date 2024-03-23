import {MessageApiInjection} from 'naive-ui/es/message/src/MessageProvider'
import {DialogApiInjection} from 'naive-ui/es/dialog/src/DialogProvider'
import {NotificationApiInjection} from 'naive-ui/es/notification/src/NotificationProvider'
import VueRouter, {Route} from 'vue-router'
import {LoadingBarApiInjection} from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import {ShortcutItem} from '@/enum/os'
import {IOptions} from '@/components/CommonUI/ViewPortWindow/utils/use-theme'

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
