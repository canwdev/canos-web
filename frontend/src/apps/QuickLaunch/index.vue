<script lang="ts">
import {defineComponent} from 'vue'
import {useCommonTools} from './use-common-tools'
import {useRoute, useRouter} from 'vue-router'
import QuickOptions from '@/components/CommonUI/QuickOptions/index.vue'
import {useQLogics} from './q-logics'
import {useTextareaAutosize} from '@vueuse/core'

export default defineComponent({
  name: 'QuickLaunch',
  components: {QuickOptions},
  setup(props, {emit}) {
    const route = useRoute()
    const qRef = ref()
    const focus = () => {
      textareaRef.value.focus()
    }
    onMounted(() => {
      focus()
    })

    const {textarea: textareaRef, input: anyText} = useTextareaAutosize()

    const {qlOptions} = useCommonTools()
    const {filteredOptions, handleSearch} = useQLogics(qlOptions)

    onMounted(() => {
      handleSearch(anyText)
    })
    watch(route, () => {
      handleSearch(anyText)
    })
    const handleInput = () => {
      handleSearch(anyText)
    }
    const cleanText = () => {
      anyText.value = ''
      handleSearch(anyText)
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