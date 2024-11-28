// 选项Item
export interface StOptionItem {
  // 选项标题
  label: string
  // 键值
  key: string
  // 定义store属性（如settingsStore），传入此值后无需传入value，将根据key动态读写store属性
  store?: any
  // 选项实际值
  value?: boolean | string | number
  type?: StOptionType
  // 传递给组件的自定义属性
  props?: any
  itemProps?: any
  // 当type为 SELECT | MULTIPLE_SWITCH 时，选项的下拉数据
  options?: any[]
  // 是否已禁用
  disabled?: boolean
  hidden?: boolean
  children?: StOptionItem[] | any
  // 图标
  icon?: string
  iconRender?: any
  iconClass?: any
  // 小标题
  subtitle?: string
  // 提示
  tips?: string
  placeholder?: string
  // 自定义类名
  cls?: string
  // action渲染函数
  actionRender?: any
  // 整体渲染函数
  render?: any
  // 点击item执行函数
  clickFn?: any
  // 隐藏展开按钮图标
  hideExpandIcon?: boolean
}

// 选项的类型
export enum StOptionType {
  SWITCH = 'switch',
  MULTIPLE_SWITCH = 'multiple_switch',
  SLIDER = 'slider',
  SELECT = 'select',
  INPUT = 'input',
  INPUT_NUMBER = 'input_number',
  COLOR_PICKER = 'color_picker',
  DYNAMIC_TAGS = 'dynamic_tags',
  DATE_PICKER = 'date_picker',
  BUTTON = 'button',
}

export type SwitchOption = {
  label: string
  value: string
}

export const swatches = [
  // Material Design
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',

  '#FFFFFF',
  '#000000',

  // Windows Blue
  '#3A6EA5',
  '#F0C869',
]
