<script setup lang="ts">
import {ref, toRefs} from 'vue'
import {AutoFormSchema, AutoFormItemType} from './enum'
import AutoFormItem from './AutoFormItem.vue'
import {FormInst} from 'naive-ui'

/**
 * Naive UI 表单生成组件
 */
const props = withDefaults(
  defineProps<{
    formSchema: AutoFormSchema
    hideActions?: boolean
    isLoading?: boolean
  }>(),
  {
    hideActions: false,
    isLoading: false,
  },
)

const emit = defineEmits(['onInvalidForm', 'onSubmit', 'onMounted', 'onBeforeUnmount'])

const {formSchema} = toRefs<any>(props)

const formRef = ref<FormInst>()
const submitForm = () => {
  formRef.value?.validate((errors) => {
    if (errors) {
      console.log('Invalid form')
      emit('onInvalidForm')
      return
    }
    // console.log('onSubmit', formSchema.value.model)
    emit('onSubmit', formSchema.value.model)
  })
}

onMounted(() => {
  emit('onMounted', formRef.value)
})

onBeforeUnmount(() => {
  emit('onBeforeUnmount', formRef.value)
})

defineExpose({
  formRef,
  AutoFormItemType,
  submitForm,
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
    :disabled="isLoading"
  >
    <transition name="fade">
      <div class="auto-form-loading-container" v-show="isLoading">
        <div class="loading-text vp-panel">Loading...</div>
      </div>
    </transition>

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
        <n-button :disabled="isLoading" type="primary" size="small" @click="submitForm()"
          >Submit</n-button
        >
      </slot>
    </div>

    <slot></slot>
  </n-form>
</template>

<style lang="scss">
.auto-form-naive {
  position: relative;

  .auto-form-loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    cursor: wait;
    &.position-fixed {
      position: fixed;
      z-index: 200;
    }

    .loading-text {
      padding: 10px;
    }
  }

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
