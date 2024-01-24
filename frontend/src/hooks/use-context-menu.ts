import {DropdownOption} from 'naive-ui'

export const useContextMenu = (getOptions) => {
  const rightMenuOptions = ref<DropdownOption[]>([])
  const showRightMenu = ref(false)
  const xRef = ref(0)
  const yRef = ref(0)

  const editingNode = ref<any | null>(null)
  const nodeAction = (node: any | null, cb) => {
    // console.log(node)
    editingNode.value = node
    cb()
  }

  return {
    editingNode,
    nodeAction,
    rightMenuOptions,
    showRightMenu,
    xRef,
    yRef,
    handleSelect: () => {
      showRightMenu.value = false
    },
    handleClickOutside: () => {
      showRightMenu.value = false
      nodeAction(null, () => {})
    },
    handleContextmenu(e: MouseEvent, option: any): void {
      rightMenuOptions.value = getOptions(option)
      showRightMenu.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY
      e.preventDefault()
    },
  }
}
