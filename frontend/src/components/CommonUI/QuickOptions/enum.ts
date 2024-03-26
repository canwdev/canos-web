export type QuickOptionItem = {
  label?: string
  // 是否为分割线
  split?: boolean
  // 搜索过滤用
  search?: string
  // 渲染内容为HTML
  html?: string
  // 如果传入，展示img为图标
  icon?: string
  iconRender?: any
  // 渲染函数
  render?: any
  // 支持传入函数以动态渲染，函数支持直接返回vue3计算属性
  children?: QuickOptionItem[] | Function
  // 传入此选项以启用 n-dropdown
  dropdown?: QuickOptionItem[]
  // dropdown item 的key
  key?: string | number
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
