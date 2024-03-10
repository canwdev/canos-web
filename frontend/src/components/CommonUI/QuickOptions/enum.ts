export type QuickOptionItem = {
  label: string
  // 搜索过滤用
  search?: string
  html?: string
  icon?: string
  // 渲染函数
  render?: any
  children?: QuickOptionItem[] | Function
  props?: {
    onClick?: any
  }
}
