<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {AutoFormItem, AutoFormItemType, AutoFormSchema} from './enum'
import _get from 'lodash/get'
import _set from 'lodash/set'
import VueMonaco from '@/components/CanUI/packages/VueMonaco/index.vue'
import VueRender from '@/components/CanUI/packages/OptionUI/Tools/VueRender.vue'

export default defineComponent({
  name: 'AutoFormItem',
  components: {VueMonaco, VueRender},
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
  <el-form-item
    :label="item.label"
    :prop="item.key"
    class="auto-form-item"
    :class="[item.cls]"
    :style="item.style || {width: item.width}"
  >
    <el-input
      v-if="item.type === AutoFormItemType.INPUT"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      v-bind="item.props"
    />
    <el-input-number
      v-else-if="item.type === AutoFormItemType.INPUT_NUMBER"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      :controls="false"
      v-bind="item.props"
    />
    <el-autocomplete
      v-else-if="item.type === AutoFormItemType.INPUT_AUTOCOMPLETE"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      v-bind="item.props"
    />
    <VueMonaco
      v-else-if="item.type === AutoFormItemType.MONACO_EDITOR"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      :disabled="item.disabled"
      show-line-numbers
      v-bind="item.props"
    />

    <el-select
      v-else-if="item.type === AutoFormItemType.SELECT"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      class="full-width"
      :disabled="item.disabled"
      v-bind="item.props"
    >
      <VueRender
        v-if="item.selectOptionRender"
        :render-fn="item.selectOptionRender"
        :params="item"
      />
      <template v-else>
        <el-option
          v-for="vi in item.options"
          :key="vi.value"
          :label="vi.label"
          :value="vi.value"
          :disabled="vi.disabled"
        />
      </template>
    </el-select>

    <el-color-picker
      v-else-if="item.type === AutoFormItemType.COLOR_PICKER"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <el-button
      v-else-if="item.type === AutoFormItemType.BUTTON"
      @click="item.clickHandler"
      :disabled="item.disabled"
      v-bind="item.props"
      >{{ item.placeholder }}</el-button
    >
    <el-date-picker
      v-else-if="item.type === AutoFormItemType.DATE_PICKER"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <el-checkbox-group
      v-else-if="item.type === AutoFormItemType.CHECKBOX_GROUP"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    >
      <el-checkbox
        v-for="(option, index) in item.options || item.props.options"
        :key="index"
        :value="option.value"
        >{{ option.label }}</el-checkbox
      >
    </el-checkbox-group>

    <el-switch
      v-else-if="item.type === AutoFormItemType.SWITCH"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <el-radio-group
      v-else-if="item.type === AutoFormItemType.RADIO_GROUP"
      :disabled="item.disabled"
      v-model="dynamicValue"
    >
      <el-radio
        v-for="(option, index) in item.options || item.props.options"
        :key="index"
        :value="option.value"
        >{{ option.label }}</el-radio
      >
    </el-radio-group>

    <VueRender v-if="item.render" :render-fn="item.render" />

    <template v-if="item.renderLabel" #label="{label}">
      <VueRender :render-fn="item.renderLabel" :label="label"
    /></template>
  </el-form-item>
</template>

<style lang="scss">
.auto-form-item {
  .el-input-number,
  .el-date-editor {
    width: 100%;
  }
  & > .el-form-item__label {
    padding-right: 0;
  }
  .el-input-number .el-input__inner {
    text-align: left;
  }
}
</style>
