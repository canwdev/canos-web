<script lang="ts">
import {defineComponent, shallowRef} from 'vue'
import {useDebounceFn} from '@vueuse/core'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {useMainStore} from '@/store/main'
import monaco from './monaco-helper'

export default defineComponent({
  name: 'VueMonaco',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'html',
    },
    showLineNumbers: {
      type: Boolean,
      default: false,
    },
    debounceMs: {
      type: Number,
      default: 100,
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const mValue = useModelWrapper(props, emit)
    const editorContainerRef = ref()
    const editorInstance = shallowRef<any>()

    const mainStore = useMainStore()
    const getThemeName = () => (mainStore.isAppDarkMode ? 'vs-dark' : 'vs')
    watch(
      () => mainStore.isAppDarkMode,
      () => {
        editorInstance.value.updateOptions({theme: getThemeName()})
      }
    )

    watch(
      () => props.modelValue,
      (newValue) => {
        if (editorInstance.value && newValue !== editorInstance.value.getValue()) {
          editorInstance.value.setValue(newValue)
        }
      }
    )

    watch(
      () => props.language,
      (newValue) => {
        if (editorInstance.value) {
          monaco.editor.setModelLanguage(editorInstance.value.getModel(), newValue)
        }
      }
    )

    onMounted(() => {
      const editor = monaco.editor.create(editorContainerRef.value, {
        value: mValue.value,
        language: props.language,
        theme: getThemeName(), // 'vs' 'hc-black' 'vs-dark'
        wordWrap: 'on',
        foldingStrategy: 'indentation', // 代码可分小段折叠
        minimap: {
          enabled: props.showLineNumbers,
        },
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
        lineNumbers: props.showLineNumbers ? 'on' : 'off',
        // glyphMargin: false,
        // folding: false,
        quickSuggestions: true,
        suggest: {
          snippetsPreventQuickSuggestions: false,
        },
        cursorSmoothCaretAnimation: 'on', // 是否启用光标平滑插入动画
        tabSize: 2,
      })
      editorInstance.value = editor

      editor.onDidChangeModelContent(() => {
        handleEditorChangeDebounced()
      })

      setTimeout(() => {
        resize()
      })
    })

    onBeforeUnmount(() => {
      editorInstance.value.dispose()
    })
    const handleEditorChangeDebounced = useDebounceFn(() => {
      mValue.value = editorInstance.value.getValue()
    }, props.debounceMs)

    const focus = () => {
      editorInstance.value.focus()
    }

    const resize = () => {
      editorInstance.value.layout()
    }

    const getInstance = () => {
      return editorInstance.value
    }

    return {
      editorContainerRef,
      focus,
      resize,
      getInstance,
    }
  },
})
</script>

<template>
  <div ref="editorContainerRef" class="vue-monaco-placeholder" />
</template>

<style lang="scss" scoped>
.vue-monaco-placeholder {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
