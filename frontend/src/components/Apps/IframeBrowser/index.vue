<script lang="ts">
import {defineComponent} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'

export default defineComponent({
  name: 'IframeBrowser',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const mVisible = useModelWrapper(props, emit, 'visible')
    const isMaximum = ref(false)
    const isLoading = ref(false)

    const iframeRef = ref()
    const iframeSrc = ref('')
    const addressBarUrl = ref('')

    const titleText = computed(() => {
      if (isLoading.value) {
        return '(Loading...)'
      }
      return ''
    })

    const handleGo = () => {
      iframeSrc.value = ''
      iframeSrc.value = addressBarUrl.value
      isLoading.value = true
    }
    const handleIframeLoad = () => {
      isLoading.value = false
    }
    const handleIframeError = (e) => {
      isLoading.value = false
      console.error('[handleIframeError]', e)
    }

    const shortcutList = computed(() => {
      return [
        {label: 'Google', value: 'https://www.google.com/webhp?igu=1'},
        {label: 'Bing', value: 'https://www.bing.com'},
        {label: 'Win11React', value: 'https://win11.blueedge.me/'},
        {label: 'Grid Layout it', value: 'https://grid.layoutit.com/'},
        {label: 'Can I use', value: 'https://caniuse.com/'},
        {label: 'CSS Gradient Generator', value: 'https://www.colorzilla.com/gradient-editor/'},
        {label: 'CSS clip-path maker', value: 'https://bennettfeely.com/clippy/'},
        {label: 'JSON Editor Online', value: 'https://jsoneditoronline.org/'},
        {label: '在线工具 tool.lu', value: 'https://tool.lu/'},
        {label: '二维码生成 cli.im', value: 'https://cli.im/'},
      ].map((item) => {
        return {
          label: '🌎 ' + (item.label || item.value),
          value: item.value,
        }
      })
    })
    const handleSelectShortcut = (url) => {
      addressBarUrl.value = url
      handleGo()
    }

    return {
      mVisible,
      iframeRef,
      iframeSrc,
      addressBarUrl,
      isMaximum,
      handleGo,
      handleIframeLoad,
      handleIframeError,
      titleText,
      shortcutList,
      handleSelectShortcut,
    }
  },
})
</script>

<template>
  <div class="iframe-browser-inner-wrap">
    <div class="iframe-browser-address-bar-wrap">
      <n-dropdown
        :options="shortcutList"
        key-field="value"
        size="small"
        placement="bottom-start"
        @select="handleSelectShortcut"
      >
        <n-button size="tiny">@</n-button>
      </n-dropdown>

      <n-input
        class="iframe-browser-input font-code"
        size="tiny"
        v-model:value="addressBarUrl"
        placeholder="input url (https://)"
        type="text"
        @keyup.enter="handleGo()"
      />
      <n-button size="tiny" @click="handleGo()">Go</n-button>
    </div>
    <iframe
      ref="iframeRef"
      @load="handleIframeLoad"
      @error="handleIframeError"
      class="iframe-browser-inner-iframe"
      :src="iframeSrc"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
.iframe-browser-inner-wrap {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .iframe-browser-address-bar-wrap {
    display: flex;
    .iframe-browser-input {
      flex: 1;
    }
  }

  .iframe-browser-inner-iframe {
    flex: 1;
    margin: 2px;
    border-radius: 8px;
  }
}
</style>
