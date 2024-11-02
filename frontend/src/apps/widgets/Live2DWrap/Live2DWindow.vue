<script lang="ts" setup>
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import {useDebounceFn, useScriptTag, useStorage, watchDebounced} from '@vueuse/core'

interface Props {
  modelPath: string
}

const props = withDefaults(defineProps<Props>(), {})

const {modelPath} = toRefs(props)

const size = ref({
  width: 320,
  height: 480,
})

watchDebounced(
  modelPath,
  (val) => {
    if (!val) {
      return
    }
    loadModel()
  },
  {debounce: 500},
)

const isRefreshing = ref(true)
const loadModel = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    setTimeout(() => {
      // @ts-ignore
      loadlive2d('live2d_canvas', modelPath.value)
    }, 0)
  })
}

useScriptTag(
  'live2d/lib/live2d.min.js',
  // on script tag loaded.
  (el: HTMLScriptElement) => {
    // loadModel()
  },
)

const handleResize = useDebounceFn((s) => {
  size.value.width = Number(s.width.replace('px', ''))
  size.value.height = Number(s.height.replace('px', ''))
  loadModel()
}, 100)
</script>

<template>
  <ViewPortWindow
    @resize="handleResize"
    :init-win-options="{width: size.width + 'px', height: size.height + 'px'}"
    :show-close="false"
    class="live2d-window"
    wid="live2d_window_size"
    allow-maximum
  >
    <template #titleBarLeft> {{ modelPath }} ({{ size.width }}x{{ size.height }}) </template>
    <div class="live2d-container">
      <canvas
        v-if="!isRefreshing"
        :width="size.width"
        :height="size.height"
        id="live2d_canvas"
      ></canvas>
    </div>
  </ViewPortWindow>
</template>

<style lang="scss">
.live2d-window {
  position: fixed;
  background: transparent !important;
  .vp-window-body {
    background: transparent !important;
  }
}
</style>

<style lang="scss" scoped>
.live2d-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;

  #live2d_canvas {
    //outline: 2px dashed currentColor;
  }
}
</style>
