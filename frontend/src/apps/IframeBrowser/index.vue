<script lang="ts">
export default {
  name: 'IframeBrowser',
}
</script>

<script lang="ts" setup>
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {useStorage} from '@vueuse/core'
import {useRemoteOptions} from '@/components/CanUI/packages/QuickOptions/utils/use-remote-options'
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'
import {TaskItem} from '@/enum/os'

type AppParams = {
  url: string
}

const props = withDefaults(
  defineProps<{
    task?: TaskItem
    appParams?: AppParams
  }>(),
  {},
)
const emit = defineEmits(['update:visible'])
const {task} = toRefs(props)
const isLoading = ref(false)

const iframeRef = ref()
const iframeSrc = ref('')
const addressBarUrl = useStorage('pagecraft_iframe_browser_url', '')

const handleGo = () => {
  iframeSrc.value = ''
  iframeSrc.value = addressBarUrl.value
  isLoading.value = true
}
const handleOpenNewTab = () => {
  window.open(iframeRef.value.src)
}

watch(
  () => props.appParams,
  () => {
    if (!props.appParams) {
      return
    }
    const {url} = props.appParams
    if (url) {
      addressBarUrl.value = url
      handleGo()
    }
  },
  {
    immediate: true,
  },
)

const titleText = computed(() => {
  if (isLoading.value) {
    return 'Loading...'
  }
  if (iframeRef.value && iframeRef.value.contentDocument) {
    // 非同源获取不到内容
    return iframeRef.value.contentDocument.title
  }

  return 'iFrame Browser'
})
watch(titleText, (val) => {
  if (task.value) {
    task.value.title = val
  }
})

onMounted(() => {
  if (addressBarUrl.value) {
    handleGo()
  }
})

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
</script>

<template>
  <div class="iframe-browser-inner-wrap">
    <div class="iframe-browser-address-bar-wrap">
      <div class="button-wrap">
        <button class="vp-button" @click="showShortcuts = true">
          <span class="mdi mdi-star"></span>
        </button>
        <QuickOptions :options="shortcutList" v-model:visible="showShortcuts" title="Shortcuts" />
      </div>

      <input
        class="iframe-browser-input vp-input font-code"
        v-model="addressBarUrl"
        placeholder="input url (https://)"
        type="text"
        @keyup.enter="handleGo()"
      />
      <button
        class="vp-button"
        @click="handleGo()"
        @contextmenu.stop="handleOpenNewTab"
        title="Visit Website"
      >
        <span class="mdi mdi-arrow-right"></span>
      </button>
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
