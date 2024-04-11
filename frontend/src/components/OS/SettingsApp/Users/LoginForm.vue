<script lang="ts" setup="">
import {FormInst, FormRules, FormValidationError} from 'naive-ui'

interface Props {
  showSubmit?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['submit'])

interface ModelType {
  username: string | null
  password: string | null
}
const formRef = ref<FormInst | null>(null)
const formModel = ref<ModelType>({
  username: '',
  password: '',
})

const formRules: FormRules = {
  username: [
    {
      required: true,
      message: 'Username is required',
      trigger: ['blur'],
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
      trigger: ['blur'],
    },
  ],
}

const handleValidate = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      window.$message.error('Invalid Form!')
      return
    }
    emit('submit', formModel.value)
  })
}

defineExpose({
  handleValidate,
})
</script>

<template>
  <n-form :disabled="disabled" ref="formRef" :model="formModel" :rules="formRules">
    <n-form-item path="username" label="Username">
      <n-input
        ref="inputUsernameRef"
        v-model:value="formModel.username"
        @keyup.enter="handleValidate"
      />
    </n-form-item>
    <n-form-item path="password" label="Password">
      <n-input
        v-model:value="formModel.password"
        type="password"
        show-password-on="click"
        @keyup.enter="handleValidate"
        class="font-code"
      />
    </n-form-item>

    <n-space v-if="showSubmit" size="small" justify="end">
      <n-button type="primary" @click="handleValidate" :disabled="disabled"> Submit </n-button>
    </n-space>
  </n-form>
</template>
