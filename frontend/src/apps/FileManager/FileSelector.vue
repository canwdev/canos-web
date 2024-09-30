<script lang="ts" setup="">
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import FileManager from '@/apps/FileManager/index.vue'

const props = withDefaults(
  defineProps<{
    // 是否文件(夹)选择器
    selectFileMode?: 'file' | 'folder'
    // 文件选择器允许多选
    multiple?: boolean
    showButton?: boolean
  }>(),
  {
    selectFileMode: 'file',
    showButton: true,
    multiple: false,
  },
)
const emit = defineEmits(['handleSelect'])
const {selectFileMode, multiple} = toRefs(props)

const isShowFileSelectWindow = ref(false)

const handleSelect = (val) => {
  isShowFileSelectWindow.value = false
  emit('handleSelect', val)
}

const actionLabel = computed(() => {
  return selectFileMode.value === 'file'
    ? multiple.value
      ? 'Open Files...'
      : 'Open File...'
    : 'Open Folder...'
})

defineExpose({
  isShowFileSelectWindow,
  show() {
    isShowFileSelectWindow.value = true
  },
  close() {
    isShowFileSelectWindow.value = false
  },
})
</script>

<template>
  <div class="file-selector">
    <button v-if="showButton" class="vp-button primary" @click="isShowFileSelectWindow = true">
      {{ actionLabel }}
    </button>

    <ViewPortWindow
      v-model:visible="isShowFileSelectWindow"
      init-center
      :init-win-options="{
        width: '500px',
        height: '500px',
      }"
    >
      <template #titleBarLeft>{{ actionLabel }}</template>
      <FileManager
        v-if="isShowFileSelectWindow"
        :selectFileMode="selectFileMode"
        :multiple="multiple"
        @cancelSelect="isShowFileSelectWindow = false"
        @handleSelect="handleSelect"
      />
    </ViewPortWindow>
  </div>
</template>

<style lang="scss" scoped>
.file-selector {
}
</style>
