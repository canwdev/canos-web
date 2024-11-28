<script lang="ts">
export default {
  name: 'ViewPortWindow',
}
</script>

<script lang="ts" setup>
import {shallowRef} from 'vue'
import {OnMoveParams, WindowController} from './utils/window-controller'

import LayoutHelper from './utils/LayoutHelper.vue'
import {useDynamicClassName, useMouseOver} from './utils/use-utils'
import {useThrottleFn, useVModel, watchDebounced} from '@vueuse/core'
import {checkWindowAttach, ILayout, WinOptions} from './enum'
import LayoutPreview from './utils/LayoutPreview.vue'

const LS_KEY_VP_WINDOW_OPTION = 'vp_window'

const props = withDefaults(
  defineProps<{
    // 是否显示窗口
    visible: boolean
    // 是否显示关闭按钮
    showClose?: boolean
    // 是否允许最大化
    allowMaximum?: boolean
    // 外部传入的是否最大化属性，支持双向绑定
    maximized?: boolean
    allowMinimum?: boolean
    minimized?: boolean
    // 是否允许移动窗口
    allowMove?: boolean
    // 允许贴边快捷调整窗口大小
    allowSnap?: boolean
    // 传入此参数用于保存窗口大小和位置
    wid?: string
    // 窗口初始化配置，可传入部分 WinOptions
    initWinOptions?: Partial<WinOptions>
    // 初始化使窗口在视口中间
    initCenter?: boolean
    // 窗口出现/隐藏的过度动画名字
    transitionName?: string
    // 不展示标题栏，拖动窗口内容
    noTitleBar?: boolean
    // 是否允许将窗体移动到视口之外
    allowOut?: boolean
    // 调视口口大小时，窗口重新定位的基础方向，默认靠左
    alignWhenViewPortResize?: 'start' | 'end'
  }>(),
  {
    showClose: true,
    allowMove: true,
    allowSnap: true,
    initCenter: true,
    allowOut: true,
    alignWhenViewPortResize: 'start',
    transitionName: 'fade-scale',
  },
)
const emit = defineEmits([
  'update:visible',
  'resize',
  'onActive',
  'onClose',
  'onRestored',
  'update:minimized',
  'update:maximized',
])
const {allowMaximum, allowMove, noTitleBar, allowSnap} = toRefs(props)

const storageKey = LS_KEY_VP_WINDOW_OPTION + '_' + props.wid
const mVisible = useVModel(props, 'visible', emit)
const rootRef = ref()
const titleBarRef = ref()
const winBodyRef = ref()
const titleBarButtonsRef = ref()
const dWindow = shallowRef<any>(null)

const isMaximized = useVModel(props, 'maximized', emit, {passive: true})
const isMinimized = useVModel(props, 'minimized', emit, {passive: true})

watch(isMinimized, (val) => {
  if (!val && mVisible.value) {
    emit('onRestored')
  }
})
onMounted(() => {
  if (!isMinimized.value && mVisible.value) {
    emit('onRestored')
  }
})

const isTransition = ref(false)
const setIsTransition = (val: boolean) => {
  if (val) {
    isTransition.value = val
  } else {
    setTimeout(() => {
      // 等待动画播放结束
      isTransition.value = val
    }, 300)
  }
}

// 请勿使用vue :class="{}" 进行类的绑定，因为vue会覆盖DOM动态添加的class
useDynamicClassName(rootRef, '_visible', mVisible)
useDynamicClassName(rootRef, '_maximized', isMaximized)
useDynamicClassName(rootRef, '_transition', isTransition)
useDynamicClassName(rootRef, '_no_title_bar', noTitleBar)
const isAllowMove = computed(() => {
  return allowMove.value && !isMaximized.value
})
useDynamicClassName(rootRef, '_allow_move', isAllowMove)

let defaultWinOptions: WinOptions = {
  top: '10px',
  left: '10px',
  width: '300px',
  height: 'auto',
  maximized: false,
}

const winOptions = reactive<WinOptions>({...defaultWinOptions})
watchDebounced(
  winOptions,
  () => {
    if (isMaximized.value) {
      // 最大化时只更新最大化状态
      const s = JSON.parse(localStorage.getItem(storageKey) || 'null')
      if (s) {
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            ...s,
            maximized: isMaximized.value,
          }),
        )
      }
      return
    }
    if (props.wid) {
      // console.log(`save ${storageKey}`, {...winOptions})
      localStorage.setItem(storageKey, JSON.stringify({...winOptions}))
    }
  },
  {deep: Boolean(props.wid), debounce: 500},
)

watch(allowMove, (val) => {
  dWindow.value.allowMove = val
  if (val) {
    dWindow.value.updateZIndex()
  }
})
watch(isMaximized, (val) => {
  dWindow.value.allowMove = !val
  dWindow.value.maximized = val

  winOptions.maximized = val
})

watch(mVisible, (val) => {
  if (val) {
    if (!isInit.value) {
      initWindowStyle()
    }
    dWindow.value.updateZIndex()
  }
})

onMounted(() => {
  dWindow.value = new WindowController({
    dragHandleEl: props.noTitleBar ? winBodyRef.value : titleBarRef.value,
    dragTargetEl: rootRef.value,
    allowOut: props.allowOut,
    // opacify: 0.8,
    preventNode: titleBarButtonsRef.value,
    onMove: handleMove,
    onActive() {
      emit('onActive')
    },
    autoPosOnResize: true,
    isDebug: false,
    resizeable: true,
    maximized: winOptions.maximized || false,
    alignWhenViewPortResize: props.alignWhenViewPortResize,
  })
  isMaximized.value = winOptions.maximized || false
  dWindow.value.allowMove = allowMove.value

  new ResizeObserver(() => {
    handleSelfResize()
  }).observe(rootRef.value)

  initWindowStyle()
})

const setPos = (dir: string, value: string) => {
  rootRef.value.style[dir] = winOptions[dir] = value
}

const isInit = ref(false)
const initWindowStyle = () => {
  if (!mVisible.value) {
    // 防止初始化不可见时的位置错误
    return
  }
  let defaultOptions = {
    ...defaultWinOptions,
  }
  if (props.initWinOptions) {
    defaultOptions = {
      ...defaultOptions,
      ...props.initWinOptions,
    }
  }

  let lsState
  let lsVal
  if (!props.wid) {
    lsState = defaultOptions
  } else {
    lsVal = JSON.parse(localStorage.getItem(storageKey) || 'null')
    // console.log(`load ${storageKey}`, lsVal)
    lsState = lsVal || defaultOptions
  }
  setPos('left', lsState.left)
  setPos('top', lsState.top)
  setPos('width', lsState.width)
  setPos('height', lsState.height)
  isInit.value = true

  setTimeout(() => {
    if (props.initCenter && !lsVal) {
      const rect = rootRef.value.getBoundingClientRect()
      // console.log(rect)
      const cx = Math.round(window.innerWidth / 2 - rect.width / 2)
      const cy = Math.round(window.innerHeight / 2 - rect.height / 2)

      winOptions.left = rootRef.value.style.left = cx + 'px'
      winOptions.top = rootRef.value.style.top = cy + 'px'
    } else {
      // 初始化后检查窗口是否在视口外，如果在则修复
      dWindow.value.handleResizeDebounced()
    }
  })
}

const fixWindowInScreen = (delayMs = 400): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rect = rootRef.value.getBoundingClientRect()
      // console.log(rect)
      let flagFixed = false
      if (rect.y < 0) {
        setPos('top', 0 + 'px')
        flagFixed = true
      }
      if (rect.x <= -rect.width) {
        setPos('left', 0 + 'px')
        flagFixed = true
      }
      if (!flagFixed) {
        if (rect.y > window.innerHeight) {
          setPos('top', window.innerHeight - rect.height + 'px')
        }
        if (rect.x > window.innerWidth) {
          setPos('left', window.innerWidth - rect.width + 'px')
        }
      }

      resolve()
    }, delayMs)
  })
}

// 窗口边缘贴靠检测 (Aero Snap)
const checkSnap = useThrottleFn(
  (params) => {
    layoutPreviewData.value = checkWindowAttach(params)
  },
  150,
  true,
)

const handleMove = async (data: OnMoveParams) => {
  // console.log('[onMove]', data)
  if (data.moveStop) {
    setTimeout(() => {
      layoutPreviewData.value = undefined
    }, 151)

    await fixWindowInScreen(0)
    if (allowSnap.value) {
      if (data.attachLayout) {
        setWindowLayout(data.attachLayout)
      }
    }
    return
  }
  const {top, left, pointerX, pointerY} = data

  if (allowSnap.value) {
    checkSnap({x: pointerX, y: pointerY})
  }

  winOptions.top = top
  winOptions.left = left
}

const handleSelfResize = useThrottleFn(() => {
  if (!mVisible.value || !rootRef.value) {
    return
  }

  const size = getComputedStyle(rootRef.value)

  winOptions.width = size.width
  winOptions.height = size.height
  emit('resize', winOptions)
}, 100)

onBeforeUnmount(() => {
  if (dWindow.value) {
    dWindow.value.destroy()
  }
})

const setActive = () => {
  dWindow.value.updateZIndex({preventOnActive: true})
}

const toggleMaximized = () => {
  if (allowMaximum.value) {
    setIsTransition(true)
    isMaximized.value = !isMaximized.value
    setIsTransition(false)
  }
}

const handleClose = () => {
  mVisible.value = false
  emit('onClose')
}

const isShowLayoutHelper = ref(false)

const setWindowLayout = (layout: ILayout) => {
  const {xRatio, yRatio, widthRatio, heightRatio, maximize} = layout
  if (maximize) {
    toggleMaximized()
    return
  }

  const {innerWidth: maxWidth, innerHeight: maxHeight} = window
  const left = Math.ceil(maxWidth * xRatio)
  const top = Math.ceil(maxHeight * yRatio)
  const width = Math.ceil(maxWidth * widthRatio)
  const height = Math.ceil(maxHeight * heightRatio)

  if (isMaximized.value) {
    isMaximized.value = false
  }
  setIsTransition(true)

  setTimeout(() => {
    setPos('left', left + 'px')
    setPos('top', top + 'px')
    setPos('width', width + 'px')
    setPos('height', height + 'px')
    setIsTransition(false)
  })
}

// 鼠标悬浮一定时间后，显示
const mButtonRef = ref()
useMouseOver(mButtonRef, {
  timeout: 800,
  onEnter: () => {
    isShowLayoutHelper.value = true
  },
})

const layoutPreviewData = ref<ILayout | undefined>(undefined)

const focus = () => {
  rootRef.value.focus()
}

defineExpose({
  isInit,
  mVisible,
  handleClose,
  setActive,
  isMaximized,
  isMinimized,
  toggleMaximized,
  isTransition,
  isShowLayoutHelper,
  setWindowLayout,
  setPos,
  layoutPreviewData,
  focus,
})
</script>

<template>
  <transition :name="transitionName">
    <div v-show="isInit && mVisible" class="vp-window" ref="rootRef" :id="wid">
      <LayoutPreview :preview-data="layoutPreviewData" />
      <LayoutHelper v-model:visible="isShowLayoutHelper" @setWindowLayout="setWindowLayout" />
      <div class="vp-window-content">
        <div
          v-show="!noTitleBar"
          ref="titleBarRef"
          class="vp-window-title-bar"
          @dblclick="toggleMaximized"
        >
          <div class="vp-window-title-bar-text text-overflow">
            <slot name="titleBarLeft"></slot>
          </div>
          <div @dblclick.stop ref="titleBarButtonsRef" class="vp-window-controls">
            <slot name="titleBarRightControls"> </slot>
            <slot name="titleBarRight">
              <button v-if="allowMinimum" @click="isMinimized = true" class="is-minimize">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 20 20"
                >
                  <g fill="none">
                    <rect
                      x="3"
                      y="9.25"
                      width="14"
                      height="1.5"
                      rx=".75"
                      fill="currentColor"
                    ></rect>
                  </g>
                </svg>
              </button>

              <button
                v-if="allowMaximum"
                ref="mButtonRef"
                @click="toggleMaximized"
                :class="[isMaximized ? 'is-restore' : 'is-maximize']"
              >
                <template v-if="isMaximized">
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M13.854 2.854a.5.5 0 0 0-.708-.708L10 5.293V3.5a.5.5 0 0 0-1 0v2.9a.6.6 0 0 0 .6.6h2.9a.5.5 0 0 0 0-1h-1.793l3.147-3.146zM6.5 13a.5.5 0 0 1-.5-.5v-1.793l-3.146 3.147a.5.5 0 0 1-.708-.708L5.293 10H3.5a.5.5 0 0 1 0-1h2.9a.6.6 0 0 1 .6.6v2.9a.5.5 0 0 1-.5.5z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M8.5 2a.5.5 0 0 0 0 1h3.793L3 12.293V8.5a.5.5 0 0 0-1 0v4.9a.6.6 0 0 0 .6.6h4.9a.5.5 0 0 0 0-1H3.707L13 3.707V7.5a.5.5 0 0 0 1 0V2.6a.6.6 0 0 0-.6-.6H8.5z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </template>
              </button>

              <button v-if="showClose" :title="`Close`" @click="handleClose" class="is-close">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 20 20"
                >
                  <g fill="none">
                    <path
                      d="M4.089 4.216l.057-.07a.5.5 0 0 1 .638-.057l.07.057L10 9.293l5.146-5.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 .057.638l-.057.07L10.707 10l5.147 5.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.638.057l-.07-.057L10 10.707l-5.146 5.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1-.057-.638l.057-.07L9.293 10L4.146 4.854a.5.5 0 0 1-.057-.638l.057-.07l-.057.07z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
              </button>
            </slot>
          </div>
        </div>

        <div ref="winBodyRef" class="vp-window-body _bg scrollbar-mini">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.vp-window {
  z-index: 100;
  min-height: 50px;
  min-width: 50px;
  box-sizing: border-box;
  &._allow_move {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
  }

  &._maximized {
    position: fixed;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    padding: 0;
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    .vp-window-content {
      .vp-window-title-bar {
        margin-left: unset;
        margin-right: unset;
      }
      .vp-window-body {
        border-left: 0;
        border-right: 0;
      }
    }
    .draggable-window-resize {
      pointer-events: none;
    }
  }

  &._transition {
    transition: all 0.2s !important;
  }

  &._dragging {
    .vp-window-body {
      // 拖拽时禁用内部鼠标事件，防止鼠标陷入
      pointer-events: none;
    }
  }

  &._no_title_bar {
    .vp-window-content {
      .vp-window-body {
        border: none;
        box-shadow: none;
        pointer-events: auto;
        height: calc(100%) !important;
      }
    }
  }

  .vp-window-content {
    height: 100%;
    display: flex;
    flex-direction: column;

    .vp-window-title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;

      .window-icon {
        width: 16px;
        height: 16px;
        pointer-events: none;
      }

      .vp-window-title-bar-text {
        display: flex;
        align-items: center;
        gap: 4px;
        line-height: 1.4;

        img {
          pointer-events: none;
        }
        .mdi {
          color: $primary;
        }
      }
    }
    .vp-window-body {
      //flex: 1;
      height: calc(100% - 30px);

      border: 1px solid rgba(0, 0, 0, 0.6);
      &._bg {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }

  .vp-window-controls {
    border-radius: 0;
    display: flex;
    align-items: flex-start;

    button {
      height: 24px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      color: inherit;

      .mdi {
        font-size: 16px;
      }

      &.active {
        background-color: $primary !important;
      }
    }
  }
}
</style>
