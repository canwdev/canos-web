<script lang="ts">
import {defineComponent} from 'vue'
import {useFileDrop} from '@/hooks/use-file-drop'
import DropZone from '@/components/CommonUI/DropZone.vue'

export default defineComponent({
  name: 'FileDrop',
  components: {
    DropZone,
  },
  emits: ['onFileDrop'],
  setup(props, {emit}) {
    return {
      ...useFileDrop({
        cbFiles: (files) => {
          emit('onFileDrop', files)
        },
      }),
    }
  },
})
</script>

<template>
  <div
    class="file-drop-wrap"
    @dragover.prevent.stop="fileDragover"
    @dragleave.prevent.stop="showDropzone = false"
    @drop.prevent.stop="fileDrop"
  >
    <transition name="mc-fade">
      <DropZone v-show="showDropzone" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.file-drop-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
