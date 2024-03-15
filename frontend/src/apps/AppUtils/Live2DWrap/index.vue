<script lang="ts" setup>
import Live2D from './Live2D.vue'
import axios from 'axios'
import {useScriptTag} from '@vueuse/core'

const hitokoto = ref('')
const showHitokoto = ref(false)
const loadingHitokoto = ref(false)
const fetchInterval = ref()
const fetchTimeout = ref()

const fetchHitokoto = () => {
  clearInterval(fetchInterval.value)
  clearTimeout(fetchTimeout.value)
  showHitokoto.value = false
  if (loadingHitokoto.value) return
  loadingHitokoto.value = true

  // const types = ['a', 'b', 'c']
  // const type = types[Math.floor(Math.random() * types.length)]
  // axios.get(`https://v1.hitokoto.cn/?c=${type}`).then(res => {
  axios
    .get(`https://v1.hitokoto.cn`)
    .then((res) => {
      setTimeout(() => {
        hitokoto.value = res.data.hitokoto
        showHitokoto.value = true
      }, 100) // 防止动画一闪而过

      // n秒后自动隐藏
      fetchTimeout.value = setTimeout(() => {
        showHitokoto.value = false
      }, 15000)
    })
    .catch((e) => {
      console.error(e)
      showHitokoto.value = false
    })
    .finally(() => {
      loadingHitokoto.value = false
    })

  // 定时刷新一言
  fetchInterval.value = setInterval(() => {
    fetchHitokoto()
  }, 30000)
}

onMounted(() => {
  fetchHitokoto()
})

const isInit = ref(false)
useScriptTag(
  'live2d/lib/live2d.js',
  // on script tag loaded.
  (el: HTMLScriptElement) => {
    isInit.value = true
  }
)
</script>

<template>
  <div class="live-2d-wrap">
    <textarea readonly>
## 备注
- https://github.com/canwdev/live2d-vue-component
- 由于 live2d.js 过于古老，我找不到未压缩的源码及其api，所以报错了也无法调试。
- 点击页面报错可能是一些[模型的问题](https://github.com/galnetwen/Live2D/issues/4)。
- 目前 live2d 实例加载后无法卸载，在对性能有要求的项目上谨慎使用。
    </textarea>

    <Live2D
      v-if="isInit"
      :model-path="'/live2d/models/suzukaze_aoba/index.json'"
      :message="hitokoto"
      :show-message="showHitokoto"
      @onLive2DClick="fetchHitokoto"
    />
  </div>
</template>

<style lang="scss">
.live-2d-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  & > textarea {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    resize: none;
    line-height: 2;
    background-color: transparent;
  }
}
</style>
