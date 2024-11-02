// 初始化窗口状态
export type WinOptions = {
  // 使用px作为单位的字符串
  top: string
  left: string
  width: string
  height: string
  // 窗口是否最大化
  maximized?: boolean
}

export interface ILayout {
  xRatio: number
  yRatio: number
  widthRatio: number
  heightRatio: number
  maximize?: boolean
}

export const LayoutPreset: {[key: string]: ILayout} = Object.freeze({
  TOP_LEFT: {xRatio: 0, yRatio: 0, widthRatio: 0.5, heightRatio: 0.5},
  TOP_RIGHT: {xRatio: 0.5, yRatio: 0, widthRatio: 0.5, heightRatio: 0.5},
  LEFT: {xRatio: 0, yRatio: 0, widthRatio: 0.5, heightRatio: 1},
  RIGHT: {xRatio: 0.5, yRatio: 0, widthRatio: 0.5, heightRatio: 1},
  BOTTOM_LEFT: {xRatio: 0, yRatio: 0.5, widthRatio: 0.5, heightRatio: 0.5},
  BOTTOM_RIGHT: {xRatio: 0.5, yRatio: 0.5, widthRatio: 0.5, heightRatio: 0.5},
  MAXIMIZE: {xRatio: 0, yRatio: 0, widthRatio: 1, heightRatio: 1, maximize: true},
})

export const layoutList: ILayout[] = [
  // 3个一组
  LayoutPreset.LEFT,
  LayoutPreset.MAXIMIZE,
  LayoutPreset.RIGHT,
  //
  LayoutPreset.TOP_LEFT,
  {xRatio: 0, yRatio: 0, widthRatio: 1, heightRatio: 0.5},
  LayoutPreset.TOP_RIGHT,
  //
  {xRatio: 0.1, yRatio: 0.1, widthRatio: 0.8, heightRatio: 0.8},
  {xRatio: 0.2, yRatio: 0.2, widthRatio: 0.6, heightRatio: 0.6},
  {xRatio: 0.3, yRatio: 0.3, widthRatio: 0.4, heightRatio: 0.4},
  //
  LayoutPreset.BOTTOM_LEFT,
  {xRatio: 0, yRatio: 0.5, widthRatio: 1, heightRatio: 0.5},
  LayoutPreset.BOTTOM_RIGHT,
]

// 贴边快捷调整窗口大小 (Aero Snap)
// 窗口边缘贴靠检测
export const checkWindowAttach = ({x, y}) => {
  if (y <= 0) {
    if (x <= 0) {
      return LayoutPreset.TOP_LEFT
    } else if (x >= window.innerWidth - 1) {
      return LayoutPreset.TOP_RIGHT
    } else {
      return LayoutPreset.MAXIMIZE
    }
  } else if (x <= 0) {
    if (y >= window.innerHeight - 1) {
      return LayoutPreset.BOTTOM_LEFT
    } else {
      return LayoutPreset.LEFT
    }
  } else if (x >= window.innerWidth - 1) {
    if (y >= window.innerHeight - 1) {
      return LayoutPreset.BOTTOM_RIGHT
    } else {
      return LayoutPreset.RIGHT
    }
  }
  return
}
