<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {AutoFormItem, AutoFormItemType, AutoFormSchema} from './enum'
import _get from 'lodash/get'
import _set from 'lodash/set'
import AdvancedNumberInput from '@/components/CommonUI/OptionUI/Tools/AdvancedNumberInput.vue'
import VueRender from '@/components/CommonUI/OptionUI/Tools/VueRender.vue'
import AdvancedInput from '@/components/CommonUI/OptionUI/Tools/AdvancedInput.vue'
import VueMonaco from '@/components/CommonUI/VueMonaco/index.vue'

export default defineComponent({
  name: 'AutoFormItem',
  components: {VueMonaco, AdvancedInput, AdvancedNumberInput, VueRender},
  props: {
    item: {
      type: Object as PropType<AutoFormItem>,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props, {emit}) {
    const {item, model} = toRefs(props)

    // 判断store是否为 RefImpl 类型，
    // 一般这种情况出现在 computed 返回的内容
    const getIsRefImpl = (obj) => {
      return obj.__v_isRef
    }
    /**
     * 获取正确的store读写路径
     * @param store Proxy 或 RefImpl 类型的对象
     * @param path 读写对象的路径字符串，用 . 隔开
     */
    const autoGetPath = (store, path: string) => {
      if (getIsRefImpl(store)) {
        return `value.${path}`
      }
      return path
    }

    const dynamicValue = computed({
      get() {
        // 支持嵌套读写值
        return _get(model.value, autoGetPath(model.value, item.value.key))
      },
      set(val) {
        // 支持嵌套读写值
        _set(model.value, autoGetPath(model.value, item.value.key), val)
        return
      },
    })

    return {
      AutoFormItemType,
      dynamicValue,
    }
  },
})
</script>

<template>
  <n-form-item
    :label="item.label"
    :path="item.key"
    class="auto-form-item"
    :class="[item.cls]"
    :style="{width: item.width}"
  >
    <n-input
      v-if="item.type === AutoFormItemType.INPUT"
      v-model:value="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
    />
    <AdvancedInput
      v-if="item.type === AutoFormItemType.ADVANCED_INPUT"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      size="small"
      type="textarea"
      v-bind="item.props"
    />
    <VueMonaco
      v-if="item.type === AutoFormItemType.MONACO_EDITOR"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      show-line-numbers
      v-bind="item.props"
    />
    <AdvancedNumberInput
      v-else-if="item.type === AutoFormItemType.INPUT_NUMBER"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <n-select
      v-else-if="item.type === AutoFormItemType.SELECT"
      v-model:value="dynamicValue"
      :placeholder="item.placeholder"
      class="full-width"
      :disabled="item.disabled"
      :options="item.options"
      size="small"
      v-bind="item.props"
    />

    <n-color-picker
      v-else-if="item.type === AutoFormItemType.COLOR_PICKER"
      v-model:value="dynamicValue"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
    />

    <n-button
      v-else-if="item.type === AutoFormItemType.BUTTON"
      @click="item.clickHandler"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
      >{{ item.placeholder }}</n-button
    >
    <n-date-picker
      v-else-if="item.type === AutoFormItemType.DATE_PICKER"
      v-model:value="dynamicValue"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
    />

    <n-checkbox-group
      v-else-if="item.type === AutoFormItemType.CHECKBOX_GROUP"
      v-model:value="dynamicValue"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
    >
      <n-space>
        <n-checkbox v-for="(option, index) in item.options" :key="index" :value="option.value">{{
          option.label
        }}</n-checkbox>
      </n-space>
    </n-checkbox-group>

    <n-switch
      v-else-if="item.type === AutoFormItemType.SWITCH"
      v-model:value="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <n-radio-group
      v-else-if="item.type === AutoFormItemType.RADIO_GROUP"
      v-model:value="dynamicValue"
      :disabled="item.disabled"
      size="small"
      v-bind="item.props"
    >
      <n-space>
        <n-radio v-for="(option, index) in item.options" :key="index" :value="option.value">{{
          option.label
        }}</n-radio>
      </n-space>
    </n-radio-group>

    <VueRender v-if="item.render" :render-fn="item.render" />
  </n-form-item>
</template>

<style lang="scss">
.auto-form-item {
}
</style>
