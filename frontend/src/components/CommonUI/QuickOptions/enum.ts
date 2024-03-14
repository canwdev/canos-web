export type QuickOptionItem = {
  label: string
  // 搜索过滤用
  search?: string
  html?: string
  icon?: string
  // 渲染函数
  render?: any
  children?: QuickOptionItem[] | Function
  // 是否启用 n-dropdown
  dropdown?: QuickOptionItem[]
  // 传入此选项以启用 DynamicValueDisplay 组件
  dynamicProps?: any
  props?: {
    // 点击的同时返回
    isBack?: boolean
    onClick?: any
    onContextmenu?: any
    style?: any
    class?: any
  }
}
