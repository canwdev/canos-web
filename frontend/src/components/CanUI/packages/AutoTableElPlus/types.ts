export type AutoTableColumn = {
  // 表单的 property，并且是 v-for 循环的 key
  key?: string
  label: string
  width?: number | string
  minWidth?: number | string
  // column 控件的属性
  props?: any
  // 内容格式化函数
  formatter?: (scope: any) => any
  // 渲染函数 (scope) => h('div', {}, null)
  render?: (scope: any) => any
  headerRender?: any
  // 传入此参数，会在表头上显示设置按钮，可让用户自定义部分表列的显示和隐藏
  isCustomizeColumn?: boolean
  type?: string
  // 固定列
  fixed?: boolean | string
}
