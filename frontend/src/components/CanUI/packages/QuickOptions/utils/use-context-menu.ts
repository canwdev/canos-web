import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'

// 获取菜单位置样式，自动处理屏幕边缘
export const getMenuPosStyle = ({x, y, width, height, isLeftSide = false}) => {
  let mx = x
  let my = y

  // 视口宽高
  const vWidth = window.innerWidth
  const vHeight = window.innerHeight

  const style: any = {
    position: 'fixed',
    transform: 'none',
    zIndex: 1000,
  }

  // 使其始终显示在屏幕内部而不超出
  const offset_left = vWidth - (mx + width)
  if (offset_left < 0) {
    mx += offset_left
  }
  if (isLeftSide || mx < x) {
    // 在菜单左侧显示，而非右侧
    mx = x - width
  }
  // 处理宽度大于视口
  if (width > vWidth) {
    mx = 0
    style.width = '95%'
  }
  style.left = mx + 'px'

  const offset_top = vHeight - (my + height)
  if (offset_top < 0) {
    my += offset_top
  }
  if (my < y) {
    my = y - height
  }
  // 处理高度大于视口
  if (height > vHeight) {
    my = 0
    style.height = '95%'
    style.overflow = 'auto'
  }
  style.top = my + 'px'

  return style
}

export const useContextMenu = (options: any = {}) => {
  const {getExtraSize} = options

  const isShow = ref(false)
  const xRef = ref(0)
  const yRef = ref(0)

  const menuWidth = ref(0)
  const menuHeight = ref(0)

  type ByPosition =
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right'
  const byElementPosition = ref<ByPosition | null>(null)
  const byElement = ref<HTMLElement | null>(null)

  // 在目标元素的各个方向展示菜单
  const showMenuByElement = (el: HTMLElement, position: ByPosition = 'top', toggle = false) => {
    if (toggle) {
      if (isShow.value) {
        isShow.value = false
        return
      }
    }
    if (isShow.value) {
      // console.log('1')
      isShow.value = false
    }
    setTimeout(() => {
      byElement.value = el
      byElementPosition.value = position
      isShow.value = true
    }, 0)
  }

  const menuRef = ref()
  const updateMenuSize = () => {
    setTimeout(() => {
      if (!menuRef.value || !menuRef.value.quickRootRef) {
        return
      }
      let w = menuRef.value.quickRootRef.offsetWidth
      let h = menuRef.value.quickRootRef.offsetHeight

      // 获取额外的宽高
      if (getExtraSize) {
        const {width: ew, height: eh} = getExtraSize()
        w += ew
        h += eh
      }
      menuWidth.value = w
      menuHeight.value = h

      // console.log(menuWidth.value, menuHeight.value)

      if (byElementPosition.value) {
        updateMenuPosition()
      }
    }, 10)
  }

  const updateMenuPosition = () => {
    const position = byElementPosition.value
    byElementPosition.value = null
    const el = byElement.value
    if (!el) {
      return
    }
    byElement.value = null

    if (!el || !position) {
      return
    }
    if (!menuRef.value || !menuRef.value.quickRootRef) {
      return
    }
    const rect = el.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    const mh = menuHeight.value
    const mw = menuWidth.value

    switch (position) {
      case 'top':
        xRef.value = rect.left + window.scrollX + rect.width / 2 - mw / 2 // 水平居中
        yRef.value = rect.top + window.scrollY - mh // 垂直位置（减去菜单高度）
        break
      case 'top-left':
        xRef.value = rect.left + window.scrollX // 水平位置（菜单在元素左上角）
        yRef.value = rect.top + window.scrollY - mh // 垂直位置（减去菜单高度）
        break
      case 'top-right':
        xRef.value = rect.right + window.scrollX - mw // 水平位置（菜单在元素右上角）
        yRef.value = rect.top + window.scrollY - mh // 垂直位置（减去菜单高度）
        break
      case 'bottom':
        xRef.value = rect.left + window.scrollX + rect.width / 2 - mw / 2 // 水平居中
        yRef.value = rect.bottom + window.scrollY // 垂直位置（菜单在元素下方）
        break
      case 'bottom-left':
        xRef.value = rect.left + window.scrollX // 水平位置（菜单在元素左下角）
        yRef.value = rect.bottom + window.scrollY // 垂直位置（菜单在元素下方）
        break
      case 'bottom-right':
        xRef.value = rect.right + window.scrollX - mw // 水平位置（菜单在元素右下角）
        yRef.value = rect.bottom + window.scrollY // 垂直位置（菜单在元素下方）
        break
      case 'left':
        xRef.value = rect.left + window.scrollX - mw // 水平位置（菜单在元素左侧）
        yRef.value = rect.top + window.scrollY + rect.height / 2 - mh / 2 // 垂直居中
        break
      case 'right':
        xRef.value = rect.right + window.scrollX // 水平位置（菜单在元素右侧）
        yRef.value = rect.top + window.scrollY + rect.height / 2 - mh / 2 // 垂直居中
        break
    }

    // 确保菜单不超出视口
    if (yRef.value < 0) {
      yRef.value = 0
    } else if (yRef.value + mh > viewportHeight) {
      yRef.value = viewportHeight - mh
    }

    if (xRef.value < 0) {
      xRef.value = 0
    } else if (xRef.value + mw > viewportWidth) {
      xRef.value = viewportWidth - mw
    }
  }

  watch(isShow, (val) => {
    if (val) {
      updateMenuSize()
    }
  })

  const ctxMenuStyle = computed(() => {
    return getMenuPosStyle({
      x: xRef.value,
      y: yRef.value,
      width: menuWidth.value,
      height: menuHeight.value,
    })
  })

  const showMenu = (event: MouseEvent) => {
    if (isShow.value) {
      isShow.value = false
    }
    setTimeout(() => {
      xRef.value = event.clientX
      yRef.value = event.clientY
      event.preventDefault()
      isShow.value = true
    })
  }

  const showMenuByPoint = ({x, y}) => {
    xRef.value = x
    yRef.value = y
    isShow.value = true
  }

  const hideMenu = () => {
    isShow.value = false
  }

  return {
    isShow,
    ctxMenuStyle,
    xRef,
    yRef,
    menuWidth,
    menuHeight,
    menuRef,
    updateMenuSize,
    showMenu,
    showMenuByPoint,
    showMenuByElement,
    hideMenu,
  }
}

// 鼠标悬浮显示子菜单
export const useHoverSubMenu = (props, emit) => {
  const {item, isStatic} = toRefs(props)

  const subMenuRef = ref()
  const isMouseOver = ref(false)
  const isMouseOverSub = ref(false)

  watch(isMouseOver, (val) => {
    if (!isStatic.value && hasChildren.value) {
      if (!val) {
        emit('onSubMenuHide')
      } else {
        setTimeout(() => {
          calculateEdge()
        })
      }
    }
  })

  // 屏幕边缘自动适应
  const calculateEdge = () => {
    const menuEl = subMenuRef.value?.$el
    // console.log(menuEl)
    if (!menuEl) {
      return
    }
    const rect = menuEl.getBoundingClientRect()
    // console.log(menuEl, rect)

    const parentMenuEl = menuEl.parentElement
    const parentRect = parentMenuEl.getBoundingClientRect()

    let offsetLeft = 0
    let offsetTop = 0
    // 视口宽高
    const vWidth = window.innerWidth
    const vHeight = window.innerHeight
    // const vHeight = window.innerHeight
    // console.log(parentMenuEl, parentRect)
    // 如果菜单右侧宽度不能容纳子菜单，则将子菜单显示在左边
    if (vWidth - (parentRect.left + parentRect.width) < rect.width) {
      offsetLeft = -parentRect.width
    }
    // 修复子菜单高度不够容纳时的弹出位置
    if (vHeight - (parentRect.top + parentRect.height) < rect.height) {
      offsetTop = parentRect.height
    }

    const style = getMenuPosStyle({
      x: rect.left + offsetLeft,
      y: rect.top + offsetTop,
      width: rect.width,
      height: rect.height,
      isLeftSide: !!offsetLeft,
    })

    // 设置样式
    Object.assign(menuEl.style, {
      ...style,
      opacity: 1,
      visibility: 'visible',
    })
  }

  const hasChildren = computed(() => {
    if (Array.isArray(item.value.children)) {
      return item.value.children.length > 0
    }
    return !!item.value.children
  })
  const subChildren = computed<QuickOptionItem[]>(() => {
    if (!hasChildren.value) {
      return []
    }
    if (Array.isArray(item.value.children)) {
      return item.value.children
    }
    return item.value.children!()
  })

  return {
    subMenuRef,
    isMouseOver,
    isMouseOverSub,
    hasChildren,
    subChildren,
  }
}
