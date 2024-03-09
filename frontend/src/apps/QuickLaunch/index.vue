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
    const {filteredOptions, handleInput} = useQLogics(qlOptions)

    onMounted(() => {
      handleInput(anyText.value)
    })
    watch(route, () => {
      handleInput(anyText.value)
    })

    return {
      inputRef,
      qRef,
      anyText,
      qlOptions,
      handleInput,
      filteredOptions,
      focus,
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
      @input="() => handleInput(anyText)"
      placeholder="/?"
      type="textarea"
      class="font-code vp-input"
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
