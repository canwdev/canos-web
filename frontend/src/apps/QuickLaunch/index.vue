<script setup lang="ts">
import {useCommonTools} from './use-common-tools'
import {useRoute, useRouter} from 'vue-router'
import QuickOptions from '@/components/CommonUI/QuickOptions/index.vue'
import {useQLogics} from './q-logics'
import {useTextareaAutosize} from '@vueuse/core'
import {useQuickLaunchPlugins} from './q-logics/plugins'
import ViewPortWindow from '@/components/CommonUI/ViewPortWindow/index.vue'
import VueMonaco from '@/components/CommonUI/VueMonaco/index.vue'

const route = useRoute()
const qRef = ref()
// 是否进入了子页面
const isEnterSub = ref(false)

const focus = () => {
  textareaRef.value.focus()
}

onMounted(() => {
  focus()
  update()
})
const {textarea: textareaRef, input: anyText} = useTextareaAutosize()

const {qlOptions} = useCommonTools()
const update = () => {
  handleSearch(anyText)
}
const {filteredOptions, handleSearch, editingCustomPlugin, saveCustomPlugin, runCustomPlugin} =
  useQLogics(qlOptions, update)
useQuickLaunchPlugins(update)

watch(route, () => {
  update()
})
const handleInput = () => {
  if (isEnterSub.value) {
    // 进入子页面后不刷新查询
    return
  }
  update()
}
const cleanText = () => {
  anyText.value = ''
  update()
}

const vueMonacoRef = ref()

defineExpose({
  focus,
})
</script>

<template>
  <div class="quick-launch">
    <textarea
      ref="textareaRef"
      rows="1"
      v-model="anyText"
      @input="handleInput"
      placeholder="/?"
      type="textarea"
      class="font-code vp-input"
      @keyup.esc="cleanText"
    ></textarea>
    <QuickOptions
      ref="qRef"
      :auto-focus="false"
      :options="filteredOptions"
      is-static
      class="font-emoji"
      @onClose="textareaRef.focus()"
      @onEnter="isEnterSub = true"
      @onBack="isEnterSub = false"
    />
  </div>
  <Teleport to="body">
    <ViewPortWindow
      :visible="!!editingCustomPlugin"
      :init-win-options="{width: '500px', height: '500px'}"
      @resize="vueMonacoRef?.resize()"
      allow-maximum
      @onClose="editingCustomPlugin = null"
    >
      <template #titleBarLeft> Editing Plugin: {{ editingCustomPlugin?.name }} </template>
      <template #titleBarRightControls>
        <button @click="runCustomPlugin" title="Run Script">▶️</button>
        <button @click="saveCustomPlugin" title="Save">💾</button>
      </template>

      <VueMonaco
        ref="vueMonacoRef"
        v-if="editingCustomPlugin"
        v-model="editingCustomPlugin.code"
        language="javascript"
        show-line-numbers
      />
    </ViewPortWindow>
  </Teleport>
</template>

<style lang="scss">
.quick-launch {
  display: flex;
  flex-direction: column;
  height: 100%;
  & > textarea {
    box-sizing: border-box;
    width: 100% !important;
    border-radius: 0 !important;
    max-height: 150px !important;
    scrollbar-width: none;
    line-height: 1;
  }
  .quick-options {
    flex: 1;
    overflow: auto;
    .option-item {
      font-size: 16px;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }
}
</style>
