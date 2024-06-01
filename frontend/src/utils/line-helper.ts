/**
 * 参考：
 * https://github.com/sahadev/vue-component-creater-ui/blob/vue3/src/utils/lineHelper.js
 */

/**
 * 判断上还是下
 * @param {*} e
 * @param {*} x
 * @param {*} y
 * @returns
 */
function judgeTopOrBottom(e, x, y) {
  const position = e.getBoundingClientRect()

  const cutDistance = Math.round((position.bottom - position.top) / 3)

  return {
    top: y < position.top + cutDistance,
    middle: y >= position.top + cutDistance && y <= position.top + cutDistance * 2,
    bottom: y > position.top + cutDistance * 2,
  }
}

export class LineHelper {
  private currentPosition: null | 'top' | 'middle' | 'bottom'
  private currentTarget: HTMLElement | null
  private preSelectTarget: HTMLElement | null
  private targetElement: HTMLElement
  private crossX: HTMLElement

  constructor(targetElement) {
    this.currentPosition = null
    this.currentTarget = null
    this.preSelectTarget = null
    this.targetElement = targetElement
    const crossX = targetElement.querySelector('.line-helper-x')
    if (!crossX) {
      console.error('crossX is not exist!')
    }
    this.crossX = crossX as HTMLElement
  }

  hideLine() {
    this.crossX.classList.remove('visible')
  }

  drawLine(event: MouseEvent) {
    const realTarget = event.target

    if (!realTarget) {
      return
    }

    const targetElement = this.targetElement
    const crossX = this.crossX

    // 只有上下定位辅助线，不再计算左右辅助线
    const directionObj = judgeTopOrBottom(realTarget, event.clientX, event.clientY)
    const position = (realTarget as HTMLElement).getBoundingClientRect()

    // 如果鼠标点在目标的上部分则绘制上部分辅助线
    if (directionObj.top && targetElement !== realTarget) {
      if (this.currentPosition === 'top' && this.currentTarget === realTarget) {
        return
      }
      this.currentPosition = 'top'
      this.currentTarget = realTarget as HTMLElement

      crossX.style.top = position.top + 'px'
      crossX.style.left = position.left + 'px'
      crossX.style.width = position.width + 'px'
      crossX.style.height = '3px'
      crossX.classList.add('visible')

      // currentPointer(realTarget.parentElement, findElementIndex(realTarget))
    } else if (directionObj.bottom && targetElement !== realTarget) {
      // 如果鼠标点在目标的下部分，则绘制下部分辅助线
      if (this.currentPosition === 'bottom' && this.currentTarget === realTarget) {
        return
      }
      this.currentPosition = 'bottom'
      this.currentTarget = realTarget as HTMLElement

      crossX.style.top = position.bottom + 'px'
      crossX.style.left = position.left + 'px'
      crossX.style.width = position.width + 'px'
      crossX.style.height = '3px'
      crossX.classList.add('visible')

      // currentPointer(realTarget.parentElement, findElementIndex(realTarget) + 1)
    } else {
      this.currentPosition = 'middle'
      this.currentTarget = realTarget as HTMLElement
      this.preSelectTarget = realTarget as HTMLElement

      crossX.style.top = position.top + 'px'
      crossX.style.left = position.left + 'px'
      crossX.style.width = position.width + 'px'
      crossX.style.height = position.height + 'px'
      crossX.classList.add('visible')

      // currentPointer(realTarget, -1)
    }
  }
}
