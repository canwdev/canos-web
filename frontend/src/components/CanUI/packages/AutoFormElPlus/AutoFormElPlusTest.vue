<script setup lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {AutoFormSchema, AutoFormItemType, MixedFormItems} from './enum'
import {FormRules} from 'element-plus'
import AutoFormElPlus from './index.vue'

const dataForm = ref<any>({
  test_input: '',
  test_number: 0,
  test_switch: true,
  test_date: 0,
  test_checkbox_group: [],
  test_select: '',
})
const dataFormRules = computed<FormRules>(() => {
  return {
    test_input: [{required: true, trigger: 'blur'}],
    test_select: [{required: true, trigger: 'blur'}],
  }
})
const formItems = computed((): MixedFormItems[] => {
  return [
    // 自定义列数示例
    {
      cols: 3,
      children: [
        {
          type: AutoFormItemType.INPUT,
          key: 'test_input',
          label: 'Test Input',
          placeholder: '自定义列数示例',
        },
        {
          type: AutoFormItemType.INPUT_NUMBER,
          key: 'test_number',
          label: 'Input Number',
        },
        {
          type: AutoFormItemType.SWITCH,
          key: 'test_switch',
          label: 'Switch',
        },
      ],
    },
    // 自动列数示例
    [
      {
        type: AutoFormItemType.DATE_PICKER,
        key: 'test_date',
        label: 'Date Picker',
      },
      {
        type: AutoFormItemType.CHECKBOX_GROUP,
        key: 'test_checkbox_group',
        label: 'Checkbox Group',
        options: [
          {label: 'XXX', value: 'xxx'},
          {label: 'YYY', value: 'yyy'},
        ],
      },
    ],
    // 普通示例
    {
      type: AutoFormItemType.RADIO_GROUP,
      key: 'test_select',
      label: 'Radio Group',
      options: [
        {label: 'AAA', value: 'aaa'},
        {label: 'BBB', value: 'bbb'},
        {label: 'CCC', value: 'ccc'},
      ],
    },
    {
      type: AutoFormItemType.SELECT,
      key: 'test_select',
      label: 'Select',
      options: [
        {label: 'AAA', value: 'aaa'},
        {label: 'BBB', value: 'bbb'},
        {label: 'CCC', value: 'ccc'},
      ],
    },
  ]
})
</script>

<template>
  <AutoFormElPlus
    :form-schema="{
      model: dataForm,
      rules: dataFormRules,
      props: {
        labelPosition: 'top',
      },
      actionButtons: true,
      formItems,
    }"
  >
    <pre>{{ dataForm }}</pre>
  </AutoFormElPlus>
</template>
