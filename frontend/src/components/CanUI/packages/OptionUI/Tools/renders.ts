import DropdownMenu from './DropdownMenu.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'

export const renderDropdownMenu = (options: QuickOptionItem[] = [], props?) => {
  return h(DropdownMenu, {options, props})
}
