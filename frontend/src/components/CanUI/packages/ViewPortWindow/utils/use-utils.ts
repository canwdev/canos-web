import {useDebounceFn, useEventListener} from '@vueuse/core'
import {onMounted, Ref} from 'vue'

/**
 * 检测鼠标是否在元素上，支持延时
 */
export const useMouseOver = (target, options: any = {}) => {
  const {timeout = 0, onEnter, onOut} = options
  let timer
  useEventListener(target, 'mouseover', (event) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      onEnter && onEnter(event)
    }, timeout)
  })
  useEventListener(target, 'mouseleave', (event) => {
    clearTimeout(timer)
    onOut && onOut(event)
  })
  useEventListener(target, 'click', () => {
    clearTimeout(timer)
  })
}

/**
 * 使用DOM方法动态设置元素的类名
 */
export const useDynamicClassName = (targetRef, className, enableRef) => {
  const toggle = (val) => {
    if (val) {
      targetRef.value.classList.add(className)
    } else {
      targetRef.value.classList.remove(className)
    }
  }
  watch(enableRef, (val) => {
    toggle(val)
  })
  onMounted(() => {
    toggle(enableRef.value)
  })
}

type ByPosition = 'top' | 'bottom' | 'left' | 'right'

// 检测鼠标或触摸按下后，向上移动距离
export const useElementMoveUpDetection = (
  elementRef: Ref<HTMLElement | null>,
  distance: number,
  position: ByPosition,
  callback: (event) => void,
) => {
  let startPos = 0 // 记录按下时的 Y 轴坐标
  let isMoving = false // 记录是否处于移动状态

  const clientPosKey = position === 'top' || position === 'bottom' ? 'clientY' : 'clientX'
  const directionFlag = position === 'top' || position === 'bottom' ? 1 : -1

  const handleStart = (event: TouchEvent | MouseEvent) => {
    startPos = event instanceof TouchEvent ? event.touches[0][clientPosKey] : event[clientPosKey] // 保存开始位置
    if (!isMoving) {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('touchmove', handleMove)
      isMoving = true
    }
  }

  const handleMove = useDebounceFn((event: TouchEvent | MouseEvent) => {
    // console.log('handleMove', event)
    const element = elementRef.value
    if (element) {
      const clientPos =
        event instanceof TouchEvent ? event.touches[0][clientPosKey] : event[clientPosKey]

      // 判断是否向上移动指定距离
      if (clientPos * directionFlag < startPos - distance) {
        // console.log('callback', event)
        handleEnd()
        callback(event)
      }
    }
  }, 50)

  const handleEnd = () => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('touchmove', handleMove)
    isMoving = false
  }

  useEventListener(elementRef, 'mousedown', handleStart)
  useEventListener(elementRef, 'touchstart', handleStart)
  useEventListener(elementRef, 'mouseup', handleEnd)
  useEventListener(elementRef, 'touchend', handleEnd)
}
