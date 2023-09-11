import {throttle} from 'throttle-debounce'

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

type DraggableOptions = {
  dragHandleEl: HTMLElement // 被鼠标按下的 handle 元素
  dragTargetEl: HTMLElement // 窗体元素
  allowOut?: boolean // 是否允许将窗体移动到视口之外
  opacify?: number // 移动时是否让窗体透明，如：0.8
  onMove?: Function // 移动中回调函数
  onActive?: Function
  preventNode?: HTMLElement // 包含在这个元素下面的子元素将不会触发移动
  autoPosOnResize?: boolean // 调整窗口大小时始终让内容显示在视口内
  isDebug?: boolean
  resizeable?: boolean
}

const RESIZE_BAR_WITH = 8
const RESIZE_BAR_HALF_WITH = 2

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
      resizeHandle.style.top = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.left = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `${RESIZE_BAR_HALF_WITH}px`
      // resizeHandle.style.background = `cyan`
      break
    case ResizeDirection.e:
      resizeHandle.style.width = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.bottom = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `-${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.s:
      resizeHandle.style.height = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.left = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.right = `${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.w:
      resizeHandle.style.width = `${RESIZE_BAR_WITH}px`
      resizeHandle.style.top = `${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.left = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.bottom = `${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.nw:
      setBoxStyle()
      resizeHandle.style.top = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.left = `-${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.ne:
      setBoxStyle()
      resizeHandle.style.right = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.top = `-${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.sw:
      setBoxStyle()
      resizeHandle.style.left = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_HALF_WITH}px`
      break
    case ResizeDirection.se:
      setBoxStyle()
      resizeHandle.style.right = `-${RESIZE_BAR_HALF_WITH}px`
      resizeHandle.style.bottom = `-${RESIZE_BAR_HALF_WITH}px`
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

  constructor(options: DraggableOptions) {
    const {dragHandleEl, dragTargetEl, onMove, autoPosOnResize} = options

    this.options = options

    this.docEl = document.documentElement
    this.deltaX = 0
    this.deltaY = 0
    this.allowMove = true

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

    dragHandleEl.addEventListener('mousedown', this.handleDragStart)
    this.updateZIndex = this.updateZIndex.bind(this)
    dragTargetEl.addEventListener('mousedown', this.updateZIndex)
    this.updateZIndex()

    this.handleResizeStart = this.handleResizeStart.bind(this)
    this.handleResizeMove = this.handleResizeMove.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
    this.prevRect = dragTargetEl.getBoundingClientRect()
    if (this.options.resizeable) {
      ResizeDirectionList.forEach((i) => {
        const resizeHandle = createResizeBar(dragTargetEl, i)
        resizeHandle.addEventListener('mousedown', this.handleResizeStart)
      })
    }

    this.debugLog('initialized', this)
  }

  destroy() {
    const {dragTargetEl, dragHandleEl, autoPosOnResize, resizeable} = this.options
    dragHandleEl.removeEventListener('mousedown', this.handleDragStart)
    dragTargetEl.removeEventListener('mousedown', this.updateZIndex)

    if (autoPosOnResize) {
      window.addEventListener('resize', this.handleResizeDebounced)
    }
    if (resizeable) {
      const node = dragTargetEl.querySelector(ClassNames.RESIZE_HANDLE)
      if (node) {
        dragTargetEl.removeChild(node)
      }
    }

    this.debugLog('destroyed')
  }

  handleDragStart(event: MouseEvent) {
    if (!this.allowMove) {
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

    this.deltaX = event.clientX - dragTargetEl.getBoundingClientRect().left
    this.deltaY = event.clientY - dragTargetEl.getBoundingClientRect().top

    docEl.addEventListener('mousemove', this.handleDragMove)
    docEl.addEventListener('mouseup', this.handleDragStop)

    // 防止拖动图片
    return false
  }

  handleDragMove(event: MouseEvent) {
    const {deltaX, deltaY} = this
    const {dragTargetEl, onMove, opacify} = this.options

    const x = event.clientX - deltaX
    const y = event.clientY - deltaY

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

  handleDragStop(event: MouseEvent) {
    const {docEl} = this
    const {dragTargetEl, opacify} = this.options

    docEl.removeEventListener('mousemove', this.handleDragMove)
    docEl.removeEventListener('mouseup', this.handleDragStop)

    if (opacify) {
      dragTargetEl.style.opacity = '1'
    }
  }

  handleResizeStart(event: MouseEvent) {
    const {docEl} = this
    const {dragTargetEl} = this.options
    this.deltaX = event.clientX
    this.deltaY = event.clientY

    this.prevRect = dragTargetEl.getBoundingClientRect()

    this.debugLog('handleDragStart', event)
    if (event.target) {
      this.currentResizeDirection =
        (event.target as HTMLElement).getAttribute('data-direction') || null
    }

    docEl.addEventListener('mousemove', this.handleResizeMove)
    docEl.addEventListener('mouseup', this.handleResizeStop)
  }

  handleResizeMove(event: MouseEvent) {
    const {deltaX, deltaY} = this
    const {dragTargetEl} = this.options
    const x = event.clientX - deltaX
    const y = event.clientY - deltaY

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
  handleResizeStop(event: MouseEvent) {
    const {docEl} = this
    docEl.removeEventListener('mousemove', this.handleResizeMove)
    docEl.removeEventListener('mouseup', this.handleResizeStop)
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

  updateZIndex() {
    const {onActive} = this.options
    if (typeof onActive === 'function') {
      onActive()
    }
    if (!this.allowMove) {
      return
    }
    const {dragTargetEl} = this.options
    const fixedElements = document.querySelectorAll('.vp-window')
    // 获取当前元素的 z-index
    const maxZIndex = Math.max(
      ...Array.from(fixedElements).map((elem) => {
        const val = getComputedStyle(elem)['z-index']
        // @ts-ignore
        return parseInt(val) || 0
      })
    )
    // console.log('maxZIndex', maxZIndex)

    // 将当前元素的 z-index 设置为最大值
    dragTargetEl.style.zIndex = String(maxZIndex)
    dragTargetEl.classList.add('_active')

    // 将其它 fixed-element 元素的 z-index 设置为比它小的值
    Array.from(fixedElements).forEach((elem) => {
      if (elem !== dragTargetEl) {
        // @ts-ignore
        elem.style.zIndex = parseInt(getComputedStyle(elem)['z-index']) - 1
        elem.classList.remove('_active')
      }
    })
  }
}
