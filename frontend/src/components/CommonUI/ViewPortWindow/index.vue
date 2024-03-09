<script lang="ts">
import {defineComponent, PropType, shallowRef} from 'vue'
import {useModelWrapper, useModelWrapperV2} from '@/hooks/use-model-wrapper'
import {WindowController, WinOptions} from './window-controller'
import {throttle} from 'throttle-debounce'
import {
  ArrowMaximize20Regular,
  ArrowMinimize20Regular,
  Dismiss20Regular,
  Subtract20Filled,
} from '@vicons/fluent'

const LS_KEY_VP_WINDOW_OPTION = 'page_craft_vp_window'

export default defineComponent({
  name: 'ViewPortWindow',
  components: {Subtract20Filled, ArrowMinimize20Regular, ArrowMaximize20Regular, Dismiss20Regular},
  props: {
    // 是否显示窗口
    visible: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true,
    },
    // 是否允许最大化
    allowMaximum: {
      type: Boolean,
      default: false,
    },
    // 外部传入的是否最大化属性，支持双向绑定
    maximized: {
      type: Boolean,
      default: false,
    },
    allowMinimum: {
      type: Boolean,
      default: false,
    },
    minimized: {
      type: Boolean,
      default: false,
    },
    // 是否允许移动窗口
    allowMove: {
      type: Boolean,
      default: true,
    },
    // 传入此参数用于保存窗口大小和位置
    wid: {
      type: [String],
      default: null,
    },
    // 窗口初始化配置
    initWinOptions: {
      type: Object as PropType<WinOptions>,
      default: null,
    },
    // 窗口出现/隐藏的过度动画名字
    transitionName: {
      type: String,
      default: 'mc-fade-scale',
    },
  },
  emits: ['update:visible', 'resize', 'onActive', 'onClose'],
  setup(props, {emit}) {
    const {allowMaximum, allowMove} = toRefs(props)
    const storageKey = LS_KEY_VP_WINDOW_OPTION + '_' + props.wid
    const mVisible = useModelWrapper(props, emit, 'visible')
    const winElRef = ref()
    const titleBarRef = ref()
    const titleBarButtonsRef = ref()
    const dWindow = shallowRef<any>(null)

    const isMaximized = useModelWrapperV2(props, emit, 'maximized')
    const isMinimized = useModelWrapperV2(props, emit, 'minimized')

    const getInitWinOptions = () => {
      const defaultValue = props.initWinOptions || {
        top: '50px',
        left: '50px',
        width: '300px',
        height: '300px',
        maximized: false,
      }
      if (!props.wid) {
        return props.initWinOptions || defaultValue
      }
      return JSON.parse(localStorage.getItem(storageKey) || 'null') || defaultValue
    }

    const winOptions = reactive<WinOptions>(getInitWinOptions())
    watch(
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
              })
            )
          }
          return
        }
        if (props.wid) {
          localStorage.setItem(storageKey, JSON.stringify({...winOptions}))
        }
      },
      {deep: Boolean(props.wid)}
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

      setTimeout(() => {
        dWindow.value.updateZIndex()
      }, 100)
    })

    watch(mVisible, (val) => {
      if (val) {
        dWindow.value.updateZIndex()
      }
    })

    onMounted(() => {
      dWindow.value = new WindowController({
        dragHandleEl: titleBarRef.value,
        dragTargetEl: winElRef.value,
        allowOut: true,
        // opacify: 0.8,
        preventNode: titleBarButtonsRef.value,
        onMove(data) {
          handleMoveDebounced(data)
        },
        onActive(data) {
          emit('onActive')
        },
        autoPosOnResize: true,
        isDebug: false,
        resizeable: true,
        maximized: winOptions.maximized || false,
      })
      isMaximized.value = winOptions.maximized || false
      dWindow.value.allowMove = allowMove.value

      new ResizeObserver(() => {
        handleResizeDebounced()
      }).observe(winElRef.value)

      initDialogStyle()
    })

    const initDialogStyle = () => {
      const lsState = getInitWinOptions()
      if (lsState) {
        winOptions.top = lsState.top
        winOptions.left = lsState.left
        winOptions.width = lsState.width
        winOptions.height = lsState.height
      }

      winElRef.value.style.top = winOptions.top
      winElRef.value.style.left = winOptions.left
      winElRef.value.style.width = winOptions.width
      winElRef.value.style.height = winOptions.height
    }

    const handleMoveDebounced = throttle(500, false, ({top, left}) => {
      winOptions.top = top
      winOptions.left = left
    })

    const handleResizeDebounced = throttle(50, false, () => {
      if (!mVisible.value || !winElRef.value) {
        return
      }
      emit('resize')

      winOptions.width = getComputedStyle(winElRef.value).width
      winOptions.height = getComputedStyle(winElRef.value).height
    })

    onBeforeUnmount(() => {
      if (dWindow.value) {
        dWindow.value.destroy()
      }
    })

    const setActive = () => {
      dWindow.value.updateZIndex({preventOnActive: true})
    }

    const setSize = (w, h) => {
      dWindow.value.updateZIndex({preventOnActive: true})
      winElRef.value.style.width = w
      winElRef.value.style.height = h
      // handleResizeDebounced()
    }

    const handleTitlebarDbClick = () => {
      if (allowMaximum.value) {
        isMaximized.value = !isMaximized.value
      }
    }

    return {
      mVisible,
      winElRef,
      titleBarRef,
      titleBarButtonsRef,
      handleClose() {
        mVisible.value = false
        emit('onClose')
      },
      setActive,
      setSize,
      isMaximized,
      isMinimized,
      handleTitlebarDbClick,
    }
  },
})
</script>

<template>
  <transition :name="transitionName">
    <div
      v-show="mVisible"
      class="vp-window"
      :class="{
        _allow_move: allowMove && !isMaximized,
        _maximized: isMaximized,
      }"
      ref="winElRef"
    >
      <div class="vp-window-content">
        <div ref="titleBarRef" class="vp-window-title-bar" @dblclick="handleTitlebarDbClick">
          <div class="vp-window-title-bar-text text-overflow">
            <slot name="titleBarLeft"></slot>
          </div>
          <div ref="titleBarButtonsRef" class="vp-window-controls">
            <slot name="titleBarRightControls"> </slot>
            <slot name="titleBarRight">
              <button v-if="allowMinimum" @click="isMinimized = true" class="is-minimize">
                <n-icon size="20">
                  <Subtract20Filled />
                </n-icon>
              </button>

              <button
                v-if="allowMaximum"
                @click="isMaximized = !isMaximized"
                :class="[isMaximized ? 'is-restore' : 'is-maximize']"
              >
                <n-icon size="20">
                  <ArrowMinimize20Regular v-if="isMaximized" />
                  <ArrowMaximize20Regular v-else />
                </n-icon>
              </button>

              <button v-if="showClose" :title="`Close`" @click="handleClose" class="is-close">
                <n-icon size="20"><Dismiss20Regular /></n-icon>
              </button>
            </slot>
          </div>
        </div>

        <div class="vp-window-body _bg _scrollbar_mini">
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

      &.active {
        background-color: rgba(255, 105, 180, 0.8) !important;
      }
    }
  }
}
</style>