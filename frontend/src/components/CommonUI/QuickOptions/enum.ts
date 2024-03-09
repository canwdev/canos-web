export type QuickOptionItem = {
  label: string
  // 搜索过滤用
  search?: string
  html?: string
  icon?: string
  children?: QuickOptionItem[]
  props?: {
    onClick?: any
  }
}
