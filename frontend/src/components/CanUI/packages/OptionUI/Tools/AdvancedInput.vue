<script lang="ts" setup>
import {useVModel} from '@vueuse/core'
interface Props {
  modelValue?: string
  showTools?: boolean
}

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  showTools: true,
})

const mValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="advanced-input-wrap">
    <n-input v-model:value="mValue" placeholder="" rows="2" v-bind="$attrs"></n-input>
    <div class="action-row" v-if="showTools">
      <button class="vp-button" @click="mValue = encodeURI(mValue)">encodeURI</button>
      <button class="vp-button" @click="mValue = decodeURI(mValue)">decodeURI</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advanced-input-wrap {
  width: 100%;
  .vp-input {
    width: 100%;
    box-sizing: border-box;
  }
  .action-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-end;
    margin-top: 4px;
    .vp-button {
      font-size: 12px;
      padding: 4px;
    }
  }
}
</style>
