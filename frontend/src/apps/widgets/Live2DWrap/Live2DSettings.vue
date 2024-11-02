<script lang="ts" setup>
import {useVModel} from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelPath: string
  }>(),
  {
    modelPath: '/live2d/models/suzukaze_aoba/index.json',
  },
)

const emit = defineEmits(['update:modelPath'])
const {modelPath} = toRefs(props)
const mModelPath = useVModel(props, 'modelPath', emit)
const defaultModelPath = '/live2d/models/suzukaze_aoba/index.json'

onMounted(() => {
  if (!mModelPath.value) {
    mModelPath.value = defaultModelPath
  }
})
</script>

<template>
  <div class="live-2d-settings">
    <ul>
      <li>
        模型URL：<input v-model="mModelPath" type="text" class="vp-input" style="width: 75%" />
        <button class="vp-button" @click="mModelPath = defaultModelPath">重置</button>
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
  </div>
</template>

<style lang="scss">
.live-2d-settings {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  backdrop-filter: blur(10px);
  ul {
    user-select: text;
    li {
      line-height: 1.5;
      font-size: 14px;
      word-break: break-word;
    }
  }
}
</style>
