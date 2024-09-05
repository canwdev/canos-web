<script lang="ts" setup="">
import {useVModel} from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
  }>(),
  {
    modelValue: [],
  },
)
const emit = defineEmits([])
const {modelValue} = toRefs(props)

const dynamicTags = useVModel(props, 'modelValue', emit)
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <div class="dynamic-tags">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput"> + New Tag </el-button>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
