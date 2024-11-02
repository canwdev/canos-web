<script lang="ts">
export default {
  name: 'Live2DWrap',
}
</script>

<script lang="ts" setup>
import Live2D from '@/apps/widgets/Live2DWrap/Live2D.vue'
import {useCursorHider} from '@/hooks/use-cursor'
import Live2DSettings from '@/apps/widgets/Live2DWrap/Live2DSettings.vue'
import {useStorage} from '@vueuse/core'

const rootRef = ref()
const isShowFloatBar = ref(false)
useCursorHider(rootRef, ({el, isShow}) => {
  isShowFloatBar.value = isShow
})

const isShowSetModel = ref(false)

const modelPath = useStorage('live2d_model_path', '')
</script>

<template>
  <div ref="rootRef" class="live2d-wrap">
    <transition name="fade">
      <div v-show="isShowFloatBar" class="float-bar">
        <button class="btn-no-style" @click="isShowSetModel = !isShowSetModel" title="Set Model">
          <span class="mdi mdi-cog"></span>
        </button>
      </div>
    </transition>
    <Live2D :model-path="modelPath" />
    <transition name="fade-up">
      <Live2DSettings v-show="isShowSetModel" v-model:model-path="modelPath" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.live2d-wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .float-bar {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 10;
    display: flex;
    gap: 4px;
    align-items: center;
    color: white;

    button {
      line-height: 1;
      font-size: 16px;
      opacity: 0.5;
    }

    &:hover {
      display: flex !important;
    }
  }

  .live-2d-settings {
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
  }
}
</style>
