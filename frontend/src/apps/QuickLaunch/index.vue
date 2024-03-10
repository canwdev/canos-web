<script lang="ts">
import {defineComponent} from 'vue'
import {useCommonTools} from './use-common-tools'
import {useRoute, useRouter} from 'vue-router'
import QuickOptions from '@/components/CommonUI/QuickOptions/index.vue'
import {useQLogics} from './q-logics'

export default defineComponent({
  name: 'QuickLaunch',
  components: {QuickOptions},
  setup(props, {emit}) {
    const route = useRoute()
    const inputRef = ref()
    const qRef = ref()
    const focus = () => {
      inputRef.value.focus()
    }
    onMounted(() => {
      focus()
    })

    const anyText = ref('')

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
      inputRef,
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
      ref="inputRef"
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
      @onClose="inputRef.focus()"
    />
  </div>
</template>

<style lang="scss">
.quick-launch {
  display: flex;
  flex-direction: column;
  height: 100%;
  & > textarea {
    border-radius: 0 !important;
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
