<script lang="ts">
import {defineComponent} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {useStorage} from '@vueuse/core'
import {useRemoteOptions} from '@/components/CanUI/packages/QuickOptions/utils/use-remote-options'
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'

export default defineComponent({
  name: 'IframeBrowser',
  components: {QuickOptions},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const mVisible = useModelWrapper(props, emit, 'visible')
    const isLoading = ref(false)

    const iframeRef = ref()
    const iframeSrc = ref('')
    const addressBarUrl = useStorage('pagecraft_iframe_browser_url', '')

    const titleText = computed(() => {
      if (isLoading.value) {
        return '(Loading...)'
      }
      return ''
    })

    onMounted(() => {
      if (addressBarUrl.value) {
        handleGo()
      }
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

    const {options: shortcutList} = useRemoteOptions({
      fetchFn: async () => {
        const res = await fetch('./bookmarks.json')
        return await res.json()
      },
      mapFn: (item) => {
        return {
          label: '🌎 ' + (item.label || item.value),
          value: item.value,
          props: {
            onClick: !item.children
              ? () => {
                  addressBarUrl.value = item.value
                  handleGo()
                }
              : undefined,
          },
        }
      },
    })
    const showShortcuts = ref(false)

    return {
      mVisible,
      iframeRef,
      iframeSrc,
      addressBarUrl,
      handleGo,
      handleIframeLoad,
      handleIframeError,
      titleText,
      shortcutList,
      showShortcuts,
    }
  },
})
</script>

<template>
  <div class="iframe-browser-inner-wrap">
    <div class="iframe-browser-address-bar-wrap">
      <div class="button-wrap">
        <el-button size="tiny" @click="showShortcuts = true">@</el-button>
        <QuickOptions :options="shortcutList" v-model:visible="showShortcuts" title="Shortcuts" />
      </div>

      <n-input
        class="iframe-browser-input font-code"
        size="tiny"
        v-model:value="addressBarUrl"
        placeholder="input url (https://)"
        type="text"
        @keyup.enter="handleGo()"
      />
      <el-button size="tiny" @click="handleGo()">Go</el-button>
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

  .button-wrap {
    position: relative;
    .quick-options {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 250px;
    }
  }

  .iframe-browser-address-bar-wrap {
    display: flex;
    .iframe-browser-input {
      flex: 1;
    }
  }

  .iframe-browser-inner-iframe {
    flex: 1;
  }
}
</style>
