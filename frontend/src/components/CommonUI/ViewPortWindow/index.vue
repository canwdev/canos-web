<script lang="ts">
import {defineComponent, PropType, shallowRef} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {WindowController, WinOptions} from './window-controller'
import {throttle} from 'throttle-debounce'
import {Dismiss20Regular} from '@vicons/fluent'

const LS_KEY_VP_WINDOW_OPTION = 'page_craft_vp_window'

export default defineComponent({
  name: 'ViewPortWindow',
  components: {Dismiss20Regular},
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
    // 窗体是否最大化
    maximum: {
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
  emits: ['update:visible', 'resize', 'onActive', 'onClose', 'onTitleBarDbclick'],
  setup(props, {emit}) {
    const {allowMove, maximum} = toRefs(props)
    const storageKey = LS_KEY_VP_WINDOW_OPTION + '_' + props.wid
    const mVisible = useModelWrapper(props, emit, 'visible')
    const dialogRef = ref()
    const titleBarRef = ref()
    const titleBarButtonsRef = ref()
    const dWindow = shallowRef<any>(null)

    const getInitWinOptions = () => {
      const defaultValue = props.initWinOptions || {
        top: '100px',
        left: '100px',
        width: '300px',
        height: '300px',
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
    watch(maximum, (val) => {
      dWindow.value.allowMove = !val
      dWindow.value.maximized = val
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
        dragTargetEl: dialogRef.value,
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
        maximized: maximum.value,
      })
      dWindow.value.allowMove = allowMove.value

      new ResizeObserver(() => {
        handleResizeDebounced()
      }).observe(dialogRef.value)

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

      dialogRef.value.style.top = winOptions.top
      dialogRef.value.style.left = winOptions.left
      dialogRef.value.style.width = winOptions.width
      dialogRef.value.style.height = winOptions.height
    }

    const handleMoveDebounced = throttle(500, false, ({top, left}) => {
      winOptions.top = top
      winOptions.left = left
    })

    const handleResizeDebounced = throttle(50, false, () => {
      if (!mVisible.value || !dialogRef.value) {
        return
      }
      emit('resize')

      winOptions.width = getComputedStyle(dialogRef.value).width
      winOptions.height = getComputedStyle(dialogRef.value).height
    })

    onBeforeUnmount(() => {
      if (dWindow.value) {
        dWindow.value.destroy()
      }
    })

    return {
      mVisible,
      dialogRef,
      titleBarRef,
      titleBarButtonsRef,
      handleClose() {
        mVisible.value = false
        emit('onClose')
      },
      setActive() {
        dWindow.value.updateZIndex({preventOnActive: true})
      },
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
        _allow_move: allowMove,
        _maximized: maximum,
      }"
      ref="dialogRef"
    >
      <div class="vp-window-content">
        <div ref="titleBarRef" class="page-craft-title-bar" @dblclick="$emit('onTitleBarDbclick')">
          <div class="page-craft-title-bar-text text-overflow">
            <slot name="titleBarLeft"></slot>
          </div>
          <div ref="titleBarButtonsRef" class="vp-window-controls">
            <slot name="titleBarRightControls"> </slot>
            <slot name="titleBarRight">
              <button v-if="showClose" :title="`Close`" @click="handleClose" class="_danger">
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
    border: none;
    box-shadow: none;
    border-radius: 0;
    .vp-window-content {
      .page-craft-title-bar {
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

    .page-craft-title-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      user-select: none;

      .window-icon {
        width: 16px;
        height: 16px;
        pointer-events: none;
      }

      .page-craft-title-bar-text {
        display: flex;
        align-items: center;
        height: 16px;
        gap: 4px;
        line-height: 1;
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
