export type QuickOptionItem = {
  label: string
  // 搜索过滤用
  search?: string
  html?: string
  icon?: string
  // 渲染函数
  render?: any
  children?: QuickOptionItem[] | Function
  dropdown?: QuickOptionItem[]
  props?: {
    // 点击的同时返回
    isBack?: boolean
    onClick?: any
    onContextmenu?: any
  }
}
