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
  // 当type为 SELECT | MULTIPLE_SWITCH 时，选项的下拉数据
  selectOptions?: any[]
  // 是否已禁用
  disabled?: boolean
  children?: StOptionItem[] | any
  // 图标
  icon?: string
  // 小标题
  subtitle?: string
  placeholder?: string
  // 自定义类名
  cls?: string
  // action渲染函数
  actionRender?: any
}

// 选项的类型
export enum StOptionType {
  SWITCH = 'switch',
  MULTIPLE_SWITCH = 'multiple_switch',
  SLIDER = 'slider',
  SELECT = 'select',
  INPUT = 'input',
  COLOR_PICKER = 'color_picker',
}

export type SwitchOption = {
  label: string
  value: string
}
