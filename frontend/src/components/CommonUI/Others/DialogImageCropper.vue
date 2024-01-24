<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default defineComponent({
  name: 'DialogImageCropper',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: null,
    },
  },
  emits: ['onSave', 'onCancel'],
  setup(props, {emit}) {
    const {src} = toRefs(props)
    const mVisible = useModelWrapper(props, emit, 'visible')
    const imgRef = ref()
    const cropperRef = shallowRef()

    watch(mVisible, (val) => {
      if (val) {
        nextTick(() => {
          cropperRef.value = new Cropper(imgRef.value, {
            // aspectRatio: 16 / 9,
            modal: false,
            autoCropArea: 0.1,
          })
        })
      } else {
        cropperRef.value = null
      }
    })

    return {
      mVisible,
      imgRef,
      handleSave() {
        const canvas = cropperRef.value.getCroppedCanvas()
        emit('onSave', canvas.toDataURL('image/png', 1))
      },
      handleCancel() {
        emit('onCancel')
      },
    }
  },
})
</script>

<template>
  <n-modal
    style="width: 100%; height: 100vh"
    preset="dialog"
    :positive-text="$t('actions.done')"
    title="Image Cropper"
    @positive-click="handleSave"
    @negative-click="handleCancel"
    @close="mVisible = false"
    :show="mVisible"
    :auto-focus="false"
    @keyup.enter="handleSave"
  >
    <template v-if="mVisible">
      <div @dblclick.stop="handleSave">
        <img ref="imgRef" class="cropping-image" :src="src" />
      </div>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>
.cropping-image {
  display: block;
  max-width: 100%;
}
</style>
