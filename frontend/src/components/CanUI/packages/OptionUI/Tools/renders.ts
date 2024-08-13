import DropdownMenu from './DropdownMenu.vue'

export const renderDropdownMenu = (options: any[] = [], props?) => {
  return h(DropdownMenu, {options, props})
}
