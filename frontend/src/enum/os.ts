import {guid} from '@/utils'
import {WinOptions} from '@/components/CanUI/packages/ViewPortWindow/utils/window-controller'
import {Component} from 'vue'

export interface ShortcutItem {
  appid: string
  title: string
  icon?: string
  iconClass?: string
  // 动态引入组件
  component?: any
  url?: string
  // 窗口初始化大小和位置，可传入部分 WinOptions 参数
  winOptions?: any
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
  iconClass: string
  // 窗口初始化大小和位置
  winOptions?: any
  // ViewPortWindow $ref
  windowRef: any
  // defineAsyncComponent(() => import(''))
  component: Component | null
  url?: string
  // 是否最小化
  minimized: boolean
  // 是否最大化
  maximized: boolean
  // 启动传入的参数
  params?: any
  // 正在关闭应用
  isClosing: boolean
}

export class TaskItem {
  constructor(options: any = {}) {
    this.appid = options.appid
    this.guid = guid()
    this.title = options.title
    this.icon = options.icon
    this.iconClass = options.iconClass
    this.winOptions = options.winOptions
    this.component = shallowRef(options.component)
    this.url = options.url
    this.minimized = options.minimized || false
    this.maximized = options.maximized || false
    this.params = options.params
    this.isClosing = false
  }
}
