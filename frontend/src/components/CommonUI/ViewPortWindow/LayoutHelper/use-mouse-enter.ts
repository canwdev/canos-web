import {useEventListener} from '@vueuse/core'

export const useMouseEnter = (target, options: any = {}) => {
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
