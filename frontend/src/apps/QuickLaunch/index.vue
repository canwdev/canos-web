<script lang="ts">
import {defineComponent} from 'vue'
import {useCommonTools} from './use-common-tools'
import {useRoute, useRouter} from 'vue-router'
import QuickOptions from '@/components/CommonUI/QuickOptions/index.vue'
import {useQLogics} from './q-logics'
import {useTextareaAutosize} from '@vueuse/core'
import {useQuickLaunchPlugins} from './q-logics/plugins'

export default defineComponent({
  name: 'QuickLaunch',
  components: {QuickOptions},
  setup(props, {emit}) {
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
    const {filteredOptions, handleSearch} = useQLogics(qlOptions)
    const update = () => {
      handleSearch(anyText)
    }
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

    return {
      textareaRef,
      qRef,
      anyText,
      qlOptions,
      handleInput,
      filteredOptions,
      focus,
      cleanText,
      isEnterSub,
    }
  },
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
