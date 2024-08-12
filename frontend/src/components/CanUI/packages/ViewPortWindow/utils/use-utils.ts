import {useEventListener} from '@vueuse/core'
/**
 * 检测鼠标是否在元素上，支持延时
 */
export const useMouseOver = (target, options: any = {}) => {
  const {timeout = 0, onEnter, onOut} = options
  let timer
  useEventListener(target, 'mouseover', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      onEnter && onEnter()
    }, timeout)
  })
  useEventListener(target, 'mouseleave', () => {
    clearTimeout(timer)
    onOut && onOut()
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
