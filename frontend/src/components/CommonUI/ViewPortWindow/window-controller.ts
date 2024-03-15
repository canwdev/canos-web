import {throttle} from 'throttle-debounce'

// 初始化窗口状态
export type WinOptions = {
  top: string
  left: string
  width: string
  height: string
  maximized?: boolean
}

const ClassNames = {
  RESIZE_HANDLE: 'draggable-window-resize',
}

enum ResizeDirection {
  n = 'n',
  s = 's',
  w = 'w',
  e = 'e',
  nw = 'nw',
  ne = 'ne',
  se = 'se',
  sw = 'sw',
}

const ResizeDirectionList = Object.values(ResizeDirection)

// 兼容触屏和鼠标
const getPointerXy = (e: any) => {
  let x = 0
  let y = 0
  if (
    e.type == 'touchstart' ||
    e.type == 'touchmove' ||
    e.type == 'touchend' ||
    e.type == 'touchcancel'
  ) {
    const touch = e.touches[0] || e.changedTouches[0]
    x = touch.pageX
    y = touch.pageY
  } else if (
    e.type == 'mousedown' ||
    e.type == 'mouseup' ||
    e.type == 'mousemove' ||
    e.type == 'mouseover' ||
    e.type == 'mouseout' ||
    e.type == 'mouseenter' ||
    e.type == 'mouseleave'
  ) {
    x = e.clientX
    y = e.clientY
  }
  return {x, y}
}

type DraggableOptions = {
  // 被鼠标按下的 handle 元素
  dragHandleEl: HTMLElement
  // 窗体元素
  dragTargetEl: HTMLElement
  // 是否允许将窗体移动到视口之外
  allowOut?: boolean
  // 移动时是否让窗体透明，如：0.8
  opacify?: number
  // 移动中回调函数
  onMove?: Function
  onActive?: Function
  // 包含在这个元素下面的子元素将不会触发移动
  preventNode?: HTMLElement
  // 调整窗口大小时始终让内容显示在视口内
  autoPosOnResize?: boolean
  // 是否打印日志
  isDebug?: boolean
  // 是否可以调整窗口大小
  resizeable?: boolean
  // 窗口是否最大化
  maximized?: boolean
}

const RESIZE_BAR_WITH = 6
const RESIZE_BAR_HALF_WITH = 2

// 管理多个窗口的状态
const windowStateSet: Set<WindowController> = new Set()

/**
 * 创建调整大小的handle元素
 * @param parentEl 上层元素，相对它绝对定位
 * @param direction 方向
 */
const createResizeBar = (parentEl: HTMLElement, direction: ResizeDirection) => {
  const resizeHandle = document.createElement('div')
  resizeHandle.className = ClassNames.RESIZE_HANDLE
  resizeHandle.style.position = 'absolute'
  resizeHandle.style.cursor = `${direction}-resize`
  resizeHandle.setAttribute('data-direction', String(direction))
  resizeHandle.style.userSelect = 'none'

  const setBoxStyle = () => {
    resizeHandle.style.width = `${RESIZE_BAR_WITH}px`
    resizeHandle.style.height = `${RESIZE_BAR_WITH}px`
    // resizeHandle.style.background = `red`
  }

  switch (direction) {
    case ResizeDirection.n:
      resizeHandle.style.height = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.left = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `${RESIZE_BAR_HALF_WITH}px`
      // resizeHandle.style.background = `cyan`
      break
    case ResizeDirection.e:
      resizeHandle.style.width = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.bottom = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `-${RESIZE_BAR_WITH}px`
      break
    case ResizeDirection.s:
      resizeHandle.style.height = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.left = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.w:
      resizeHandle.style.width = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.left = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.bottom = `${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.nw:
      setBoxStyle()
      resizeHandle.style.top = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.left = `-${RESIZE_BAR_WITH}px`
      break
    case ResizeDirection.ne:
      setBoxStyle()
      resizeHandle.style.right = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `-${RESIZE_BAR_WITH}px`
      break
    case ResizeDirection.sw:
      setBoxStyle()
      resizeHandle.style.left = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_WITH}px`
      break
    case ResizeDirection.se:
      setBoxStyle()
      resizeHandle.style.right = `-${RESIZE_BAR_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_WITH}px`
      break
  }

  parentEl.appendChild(resizeHandle)

  return resizeHandle
}

export class WindowController {
  private docEl: HTMLElement
  private deltaX: number
  private deltaY: number
  private readonly options: DraggableOptions
  private readonly handleResizeDebounced: any
  private prevRect: DOMRect
  private currentResizeDirection: string | null
  private allowMove: boolean
  private maximized: boolean

  constructor(options: DraggableOptions) {
    const {dragHandleEl, dragTargetEl, onMove, autoPosOnResize} = options

    this.options = options

    this.docEl = document.documentElement
    this.deltaX = 0
    this.deltaY = 0
    this.allowMove = true
    this.maximized = options.maximized || false

    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragMove = this.handleDragMove.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
    this.currentResizeDirection = null
    this.handleResizeDebounced = throttle(500, false, () => {
      if (this.isHidden()) {
        return
      }
      const {left, top} = this.setInScreenPosition({
        x: dragTargetEl.offsetLeft,
        y: dragTargetEl.offsetTop,
      })
      this.debugLog('handleResizeDebounced', {left, top})

      if (typeof onMove === 'function') {
        onMove({top, left})
      }
    })

    if (autoPosOnResize) {
      window.addEventListener('resize', this.handleResizeDebounced)
      this.handleResizeDebounced()
    }

    this.updateZIndex = this.updateZIndex.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    ;['mousedown', 'touchstart'].forEach((eventName) => {
      dragHandleEl.addEventListener(eventName, this.handleDragStart)
      dragTargetEl.addEventListener(eventName, this.handleMouseDown)
    })

    this.handleResizeStart = this.handleResizeStart.bind(this)
    this.handleResizeMove = this.handleResizeMove.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
    this.prevRect = dragTargetEl.getBoundingClientRect()
    if (this.options.resizeable) {
      ResizeDirectionList.forEach((i) => {
        const resizeHandle = createResizeBar(dragTargetEl, i)
        ;['mousedown', 'touchstart'].forEach((eventName) => {
          resizeHandle.addEventListener(eventName, this.handleResizeStart)
        })
      })
    }

    setTimeout(() => {
      this.updateZIndex()
    })

    windowStateSet.add(this)

    this.debugLog('initialized', this)
  }

  destroy() {
    const {dragTargetEl, dragHandleEl, autoPosOnResize, resizeable} = this.options
    ;['mousedown', 'touchstart'].forEach((eventName) => {
      dragHandleEl.removeEventListener(eventName, this.handleDragStart)
      dragTargetEl.removeEventListener(eventName, this.handleMouseDown)
    })

    if (autoPosOnResize) {
      window.addEventListener('resize', this.handleResizeDebounced)
    }
    if (resizeable) {
      const node = dragTargetEl.querySelector(ClassNames.RESIZE_HANDLE)
      if (node) {
        dragTargetEl.removeChild(node)
      }
    }

    windowStateSet.delete(this)
    this.debugLog('destroyed')
  }

  handleDragStart(event) {
    if (!this.allowMove || this.maximized) {
      return
    }
    const {docEl} = this

    const {preventNode, dragTargetEl} = this.options

    if (preventNode) {
      // console.log(preventNode, event.target)
      if (preventNode.contains(event.target as Node)) {
        return false
      }
    }

    const xy = getPointerXy(event)

    this.deltaX = xy.x - dragTargetEl.getBoundingClientRect().left
    this.deltaY = xy.y - dragTargetEl.getBoundingClientRect().top
    ;['mousemove', 'touchmove'].forEach((eventName) => {
      docEl.addEventListener(eventName, this.handleDragMove)
    })
    ;['mouseup', 'touchend'].forEach((eventName) => {
      docEl.addEventListener(eventName, this.handleDragStop)
    })

    // 防止拖动图片
    return false
  }

  handleDragMove(event) {
    const {deltaX, deltaY} = this
    const {dragTargetEl, onMove, opacify} = this.options

    const xy = getPointerXy(event)
    const x = xy.x - deltaX
    const y = xy.y - deltaY

    let left, top
    if (!this.options.allowOut) {
      const pos = this.setInScreenPosition({x, y})
      left = pos.left
      top = pos.top
    } else {
      const {scaleX, scaleY} = this.fixZoom()
      left = dragTargetEl.style.left = Math.round(x) * scaleX + 'px'
      top = dragTargetEl.style.top = Math.round(y) * scaleY + 'px'
    }

    if (typeof onMove === 'function') {
      onMove({top, left})
    }

    if (opacify) {
      dragTargetEl.style.opacity = String(opacify)
    }

    // return false;
  }

  handleDragStop(event) {
    const {docEl} = this
    const {dragTargetEl, opacify} = this.options

    ;['mousemove', 'touchmove'].forEach((eventName) => {
      docEl.removeEventListener(eventName, this.handleDragMove)
    })
    ;['mouseup', 'touchend'].forEach((eventName) => {
      docEl.removeEventListener(eventName, this.handleDragStop)
    })

    if (opacify) {
      dragTargetEl.style.opacity = '1'
    }
  }

  handleResizeStart(event) {
    const {docEl} = this
    const {dragTargetEl} = this.options

    const xy = getPointerXy(event)

    this.deltaX = xy.x
    this.deltaY = xy.y

    this.prevRect = dragTargetEl.getBoundingClientRect()

    this.debugLog('handleDragStart', event)
    if (event.target) {
      this.currentResizeDirection =
        (event.target as HTMLElement).getAttribute('data-direction') || null
    }
    ;['mousemove', 'touchmove'].forEach((eventName) => {
      docEl.addEventListener(eventName, this.handleResizeMove)
    })
    ;['mouseup', 'touchend'].forEach((eventName) => {
      docEl.addEventListener(eventName, this.handleResizeStop)
    })
  }

  handleResizeMove(event) {
    const {deltaX, deltaY} = this
    const {dragTargetEl} = this.options

    const xy = getPointerXy(event)
    const x = xy.x - deltaX
    const y = xy.y - deltaY

    const rect = this.prevRect

    const updateN = () => {
      const newVal = rect.top + y
      dragTargetEl.style.top = newVal + 'px'
      dragTargetEl.style.height = rect.height - y + 'px'
    }
    const updateE = () => {
      dragTargetEl.style.width = rect.width + x + 'px'
    }
    const updateS = () => {
      dragTargetEl.style.height = rect.height + y + 'px'
    }
    const updateW = () => {
      const newVal = rect.left + x
      dragTargetEl.style.left = rect.left + x + 'px'
      dragTargetEl.style.width = rect.width - x + 'px'
    }

    switch (this.currentResizeDirection) {
      case ResizeDirection.n:
        updateN()
        break
      case ResizeDirection.e:
        updateE()
        break
      case ResizeDirection.s:
        updateS()
        break
      case ResizeDirection.w:
        updateW()
        break
      case ResizeDirection.nw:
        updateN()
        updateW()
        break
      case ResizeDirection.ne:
        updateN()
        updateE()
        break
      case ResizeDirection.se:
        updateS()
        updateE()
        break
      case ResizeDirection.sw:
        updateS()
        updateW()
        break
    }

    // this.debugLog('xy', {x, y}, rect)
  }
  handleResizeStop(event) {
    const {docEl} = this
    ;['mousemove', 'touchmove'].forEach((eventName) => {
      docEl.removeEventListener(eventName, this.handleResizeMove)
    })
    ;['mouseup', 'touchend'].forEach((eventName) => {
      docEl.removeEventListener(eventName, this.handleResizeStop)
    })
  }

  handleMouseDown(event) {
    // 鼠标中键和右键不触发更新
    if (event.button === 1 || event.button === 2) {
      return
    }
    this.updateZIndex()
  }

  isHidden() {
    const {dragHandleEl} = this.options
    return dragHandleEl.offsetParent === null
  }

  fixZoom() {
    const {dragTargetEl} = this.options
    const rect = dragTargetEl.getBoundingClientRect()
    const scaleX = rect.width / dragTargetEl.offsetWidth
    const scaleY = rect.height / dragTargetEl.offsetHeight

    return {
      scaleX,
      scaleY,
    }
  }

  setInScreenPosition({x, y}) {
    const {docEl} = this
    const {dragTargetEl} = this.options
    const rect = dragTargetEl.getBoundingClientRect()
    const docWidth = docEl.clientWidth - rect.width
    const docHeight = docEl.clientHeight - rect.height

    const left = (dragTargetEl.style.left = Math.round(Math.min(docWidth, Math.max(0, x))) + 'px')
    const top = (dragTargetEl.style.top = Math.round(Math.min(docHeight, Math.max(0, y))) + 'px')

    return {left, top}
  }

  debugLog(message, ...args) {
    if (this.options.isDebug) {
      console.log(`[draggableWindow] ${message}`, ...args)
    }
  }

  /**
   * 更新 z-index
   */
  updateZIndex(opt: any = {}) {
    const {
      preventOnActive = false, // 传入 true 用于防止死循环
    } = opt
    if (!preventOnActive) {
      const {onActive} = this.options
      if (typeof onActive === 'function') {
        onActive()
      }
    }
    if (!this.allowMove && !this.maximized) {
      this.debugLog('[updateZIndex] return')
      return
    }
    const {dragTargetEl} = this.options

    // 获取当前元素的 z-index
    const currentZIndex = getComputedStyle(dragTargetEl)['z-index']

    // 获取同类型窗口最大的 z-index
    let maxZIndex = -1
    let maxZIndexEl: any = null
    const els: HTMLElement[] = Array.from(windowStateSet)
      .map((item) => {
        return item.options.dragTargetEl
      })
      .filter(Boolean) as HTMLElement[]

    els.forEach((el) => {
      const val = getComputedStyle(el)['z-index']
      const idx = parseInt(val) || 0
      if (idx > maxZIndex) {
        maxZIndex = idx
        maxZIndexEl = el
      }
    })

    // console.log('[updateZIndex]', els, maxZIndex)

    dragTargetEl.classList.add('_active')

    // 是当前窗口不进行操作
    if (dragTargetEl === maxZIndexEl) {
      return
    }
    // 将当前元素的 z-index 设置为最大值
    dragTargetEl.style.zIndex = String(maxZIndex)

    // 将其它 fixed-element 元素的 z-index 设置为比它小的值
    Array.from(els).forEach((el) => {
      if (el !== dragTargetEl) {
        // @ts-ignore
        el.style.zIndex = parseInt(getComputedStyle(el)['z-index']) - 1
        el.classList.remove('_active')
      }
    })
  }
}
