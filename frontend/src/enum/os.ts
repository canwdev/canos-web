import {guid} from '@/utils'
import {WinOptions} from '@/components/CommonUI/ViewPortWindow/window-controller'
import {Component} from 'vue'

export interface ShortcutItem {
  appid: string
  title: string
  icon: string
  // 动态引入组件
  component: any
  // 窗口id，设置用于保存窗口的位置和大小
  winId?: string | null
  // 窗口初始化大小和位置
  winOptions?: WinOptions | null
  // 是否为单实例
  singleInstance?: boolean
  // 是否需要后端服务，如果后端服务未启动，则该程序不可用
  requireBackend?: boolean
}

export interface TaskItem {
  appid: string
  guid: string
  title: string
  icon: string
  winId: string | null
  // 窗口初始化大小和位置
  winOptions: WinOptions | null
  // ViewPortWindow $ref
  windowRef: any
  // defineAsyncComponent(() => import(''))
  component: Component | null
  // 是否最小化
  minimized: boolean
  // 是否最大化
  maximized: boolean
}

export class TaskItem {
  constructor(options: any = {}) {
    this.appid = options.appid
    this.guid = guid()
    this.title = options.title
    this.icon = options.icon
    this.winId = options.winId
    this.winOptions = options.winOptions
    this.component = shallowRef(options.component)
    this.minimized = options.minimized || false
    this.maximized = options.maximized || false
  }
}
