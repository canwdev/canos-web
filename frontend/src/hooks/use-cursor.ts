// 鼠标不移动时，自动隐藏
export const useCursorHider = (
  elRef: Ref<HTMLElement>,
  showHideFn: (param: {el: HTMLElement; isShow: boolean}) => void,
  ms = 1000,
) => {
  const timeoutID = ref()

  const runTimer = () => {
    clearTimeout(timeoutID.value)
    timeoutID.value = setTimeout(() => {
      hideCursor()
    }, ms)
  }

  const hideCursor = () => {
    if (typeof showHideFn === 'function') {
      showHideFn({el: elRef.value, isShow: false})
    } else {
      elRef.value.style.cursor = 'none'
    }
  }
  const showCursor = () => {
    if (typeof showHideFn === 'function') {
      showHideFn({el: elRef.value, isShow: true})
    } else {
      elRef.value.style.cursor = ''
    }
    runTimer()
  }

  onMounted(() => {
    elRef.value.addEventListener('mousemove', showCursor)
  })

  onBeforeUnmount(() => {
    clearTimeout(timeoutID.value)
    elRef.value.removeEventListener('mousemove', showCursor)
  })
}
