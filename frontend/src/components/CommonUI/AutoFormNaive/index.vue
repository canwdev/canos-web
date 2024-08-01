<script lang="ts">
import {defineComponent, onBeforeMount, PropType, ref, toRefs} from 'vue'
import {AutoFormSchema, AutoFormItemType} from './enum'
import AutoFormItem from './AutoFormItem.vue'
import {FormInst} from 'naive-ui'

/**
 * Naive UI 表单生成组件
 */
export default defineComponent({
  name: 'AutoFormNaive',
  components: {AutoFormItem},
  props: {
    formSchema: {
      type: Object as PropType<AutoFormSchema>,
      required: true,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onInvalidForm', 'onSubmit', 'onMounted', 'onBeforeUnmount'],
  setup(props, {emit}) {
    const {formSchema} = toRefs<any>(props)

    const formRef = ref<FormInst>()
    const submitForm = () => {
      formRef.value?.validate((errors) => {
        if (errors) {
          console.log('Invalid form')
          emit('onInvalidForm')
          return
        }
        console.log('onSubmit', formSchema.value.model)
        emit('onSubmit', formSchema.value.model)
      })
    }

    onMounted(() => {
      emit('onMounted', formRef.value)
    })

    onBeforeUnmount(() => {
      emit('onBeforeUnmount', formRef.value)
    })

    return {
      formRef,
      AutoFormItemType,
      submitForm,
    }
  },
})
</script>

<template>
  <n-form
    ref="formRef"
    :label-width="formSchema.labelWidth"
    :model="formSchema.model"
    :rules="formSchema.rules"
    :label-position="formSchema.labelPosition"
    class="auto-form-naive"
    @submit.prevent="submitForm"
    size="small"
    v-bind="formSchema.props"
  >
    <template v-for="(item, index) in formSchema.formItems">
      <!-- 自动grid数组-->
      <div
        :key="'g_' + index"
        class="auto-form-grid"
        :class="[`count-${item.length}`]"
        v-if="Array.isArray(item)"
        :style="{gridTemplateColumns: `repeat(${item.length}, 1fr)`}"
      >
        <template v-for="vi in item">
          <AutoFormItem v-if="'key' in vi" :key="vi.key" :item="vi" :model="formSchema.model" />
        </template>
      </div>
      <!-- 手动grid数组(AutoFormRow)-->
      <div
        :key="'ag_' + index"
        class="auto-form-grid"
        :class="[`count-${item.cols}`]"
        v-else-if="'children' in item && Array.isArray(item.children)"
        :style="{gridTemplateColumns: `repeat(${item.cols}, 1fr)`}"
      >
        <AutoFormItem
          v-for="vi in item.children"
          :key="vi.key"
          :item="vi"
          :model="formSchema.model"
        />
      </div>
      <!-- 单个内容-->
      <AutoFormItem v-else-if="'key' in item" :key="index" :item="item" :model="formSchema.model" />
    </template>

    <!-- 操作按钮-->
    <div v-if="!hideActions" class="auto-form-actions">
      <slot name="actions" :submit-form="submitForm">
        <n-button type="primary" size="small" @click="submitForm()">Submit</n-button>
      </slot>
    </div>

    <slot></slot>
  </n-form>
</template>

<style lang="scss">
.auto-form-naive {
  .auto-form-grid {
    display: grid;
    grid-template-rows: auto;
    gap: 10px;
  }
  .auto-form-actions {
    display: flex;
    justify-content: flex-end;
  }
  .af-render-gap {
  }
}
</style>
