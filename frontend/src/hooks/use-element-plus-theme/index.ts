import {PRE, PRE_DARK, PRE_LIGHT, WHITE, BLACK} from './token'
import {onBeforeMount} from 'vue'
import {useStyleTag} from '@vueuse/core'
import {StyleEditorKeys} from '@/components/StyleEditor/enum'

const html = document.documentElement

/**
 * 混合颜色
 */
const mix = (color1: string, color2: string, weight: number) => {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  const r = Math.round(r1 * (1 - weight) + r2 * weight)
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
  const b = Math.round(b1 * (1 - weight) + b2 * weight)
  const _r = ('0' + (r || 0).toString(16)).slice(-2)
  const _g = ('0' + (g || 0).toString(16)).slice(-2)
  const _b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + _r + _g + _b
}

export function useElementPlusTheme(color?: string) {
  const {css} = useStyleTag('', {id: 'element-style-override'})
  onBeforeMount(() => changeTheme(color))

  /**
   * 更换颜色的方法
   * @param color 颜色
   */
  const changeTheme = (color?: string) => {
    if (!color) return
    const styleObj: any = {}
    const styleObjDark: any = {}
    // 设置主要颜色
    styleObj[PRE] = color
    styleObjDark[PRE] = color
    // 循环设置次级颜色
    for (let i = 1; i < 10; i += 1) {
      styleObj[`${PRE_LIGHT}-${i}`] = mix(color, WHITE, i * 0.1)
      styleObjDark[`${PRE_LIGHT}-${i}`] = mix(color, BLACK, i * 0.1)
    }
    // 设置主要暗色
    const dark = mix(color, BLACK, 0.2)
    styleObj[`${PRE_DARK}-2`] = dark

    css.value = `body {
${Object.keys(styleObj)
  .map((key) => {
    return `${key}: ${styleObj[key]}`
  })
  .join(';\n')}
}
html.dark body {
${Object.keys(styleObjDark)
  .map((key) => {
    return `${key}: ${styleObjDark[key]}`
  })
  .join(';\n')}
}`
  }

  return {
    changeTheme,
  }
}
