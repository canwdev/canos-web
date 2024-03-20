export type QuickOptionItem = {
  label: string
  // 搜索过滤用
  search?: string
  // 渲染内容为HTML
  html?: string
  // 如果传入，展示img为图标
  icon?: string
  // 渲染函数
  render?: any
  children?: QuickOptionItem[] | Function
  // 传入此选项以启用 n-dropdown
  dropdown?: QuickOptionItem[]
  // 传入此选项以启用 DynamicValueDisplay 组件
  dynamicProps?: any
  subSearchable?: any
  disabled?: boolean
  props?: {
    // 点击的同时返回
    isBack?: boolean
    onClick?: any
    onContextmenu?: any
    style?: any
    class?: any
  }
}
