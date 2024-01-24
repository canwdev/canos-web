<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'DropZone',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div class="file-dropzone">
    <div class="border-dashed">{{ text || $t('msgs.drop_files_here') }}</div>
  </div>
</template>

<style lang="scss" scoped>
.file-dropzone {
  pointer-events: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  box-sizing: border-box;
  z-index: 200;

  .border-dashed {
    height: 100%;
    width: 100%;
    color: #aaff00;
    border: 3px dashed;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 18px;
    box-sizing: border-box;
    flex-direction: column;

    .material-icons {
      font-size: 50px;
      margin-bottom: 15px;
    }
  }
}
</style>
