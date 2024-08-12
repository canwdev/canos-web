<script lang="ts" setup="">
import {FormInst, FormRules, FormValidationError} from 'naive-ui'
import AutoFormNaive from '@/components/CanUI/packages/AutoFormNaive/index.vue'
import {computed} from 'vue'
import {AutoFormItemType, MixedFormItems} from '@/components/CanUI/packages/AutoFormNaive/enum'

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
const formRef = ref()
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

const submitForm = () => {
  formRef.value.submitForm()
}
const formItems = computed((): MixedFormItems[] => {
  return [
    {
      type: AutoFormItemType.INPUT,
      key: 'username',
      label: 'Username',
      placeholder: ' ',
      props: {
        onKeyup: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            submitForm()
          }
        },
      },
    },
    {
      type: AutoFormItemType.INPUT,
      key: 'password',
      label: 'Password',
      placeholder: ' ',
      props: {
        type: 'password',
        showPasswordOn: 'click',
        onKeyup: (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            submitForm()
          }
        },
      },
    },
  ]
})

defineExpose({
  submitForm,
})
</script>

<template>
  <AutoFormNaive
    ref="formRef"
    :form-schema="{
      model: formModel,
      rules: formRules,
      props: {
        labelPosition: 'top',
      },
      formItems,
    }"
    hide-actions
    @onSubmit="$emit('submit', formModel)"
  />
</template>
