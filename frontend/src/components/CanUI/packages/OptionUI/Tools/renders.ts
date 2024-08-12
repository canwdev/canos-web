import NDropdownMenu from './NDropdownMenu.vue'

export const renderNDropdownMenu = (options: any[] = []) => {
  return h(NDropdownMenu, {options})
}
