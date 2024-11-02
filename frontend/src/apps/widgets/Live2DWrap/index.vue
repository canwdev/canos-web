<script lang="ts" setup>
import Live2DWindow from './Live2DWindow.vue'
import {useStorage} from '@vueuse/core'

const defaultModelPath = '/live2d/models/suzukaze_aoba/index.json'
const modelPath = useStorage('live2d_model_path', defaultModelPath)
onMounted(() => {})
</script>

<template>
  <div class="live-2d-wrap">
    <ul>
      <li>
        模型URL：<input v-model="modelPath" type="text" class="vp-input" style="width: 75%" />
        <button class="vp-button" @click="modelPath = defaultModelPath">重置</button>
      </li>
    </ul>

    <ul>
      <li>备注</li>
      <li>https://github.com/guansss/pixi-live2d-display</li>
      <li>https://github.com/canwdev/live2d-vue-component</li>
      <li>https://github.com/galnetwen/Live2D</li>
      <li>https://github.com/imuncle/live2d</li>
      <li>https://github.com/Eikanya/Live2d-model</li>
      <li>https://guansss.github.io/live2d-viewer-web/</li>
      <li>
        点击页面报错可能是一些<a href="https://github.com/galnetwen/Live2D/issues/4" target="_blank"
          >模型的问题</a
        >
      </li>
      <li>目前 live2d 实例加载后无法卸载，在对性能有要求的项目上谨慎使用。</li>
    </ul>

    <Teleport to=".page-root">
      <Live2DWindow :model-path="modelPath" />
    </Teleport>
  </div>
</template>

<style lang="scss">
.live-2d-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  ul {
    user-select: text;
  }
}
</style>
