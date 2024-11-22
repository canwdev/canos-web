<script lang="ts" setup>
import {computed, toRefs} from 'vue'
import {StOptionItem, StOptionType, swatches} from './enum'
import RectSwitch from './Tools/RectSwitch.vue'
import VueRender from './Tools/VueRender.vue'
import AdvancedNumberInput from './Tools/AdvancedNumberInput.vue'
import DynamicTags from './Tools/DynamicTags.vue'

const props = defineProps<{
  item: StOptionItem
}>()
const {item} = toRefs(props)
const emit = defineEmits(['updateValue'])

// 顶层父组件的数据
const sharedStore = inject<any>('sharedStore')

const dynamicValue = computed({
  get() {
    const store = item.value.store || sharedStore.value
    if (store) {
      return store[item.value.key]
    }
    return item.value.value
  },
  set(val) {
    emit('updateValue', {item: item.value, value: val})
    const store = item.value.store || sharedStore.value
    if (store) {
      store[item.value.key] = val
      return
    }
    item.value.value = val
  },
})
</script>

<template>
  <el-space class="option-item-action" size="small" align="center">
    <el-switch
      v-if="item.type === StOptionType.SWITCH"
      v-model="dynamicValue"
      v-bind="item.props"
    />

    <RectSwitch
      v-else-if="item.type === StOptionType.MULTIPLE_SWITCH"
      :options="item.options"
      v-model="dynamicValue"
      v-bind="item.props"
    />

    <el-input
      class="option-select option-input"
      v-else-if="item.type === StOptionType.INPUT"
      v-model="dynamicValue"
      clearable
      v-bind="item.props"
    />

    <el-select
      v-else-if="item.type === StOptionType.SELECT"
      v-model="dynamicValue"
      :placeholder="item.placeholder"
      class="option-select"
      :teleported="false"
      v-bind="item.props"
    >
      <el-option v-for="vi in item.options" :key="vi.value" :label="vi.label" :value="vi.value" />
    </el-select>

    <DynamicTags
      class="dynamic-tags"
      v-else-if="item.type === StOptionType.DYNAMIC_TAGS"
      v-model="dynamicValue"
      v-bind="item.props"
    />

    <el-color-picker
      v-else-if="item.type === StOptionType.COLOR_PICKER"
      v-model="dynamicValue"
      v-bind="item.props"
      :predefine="swatches"
    />

    <!-- 高级的数字输入框-->
    <AdvancedNumberInput
      v-else-if="item.type === StOptionType.INPUT_NUMBER"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <el-date-picker
      v-else-if="item.type === StOptionType.DATE_PICKER"
      v-model="dynamicValue"
      :disabled="item.disabled"
      class="option-select"
      v-bind="item.props"
    />

    <button
      v-else-if="item.type === StOptionType.BUTTON"
      :disabled="item.disabled"
      v-bind="item.props"
      class="vp-button"
    >
      {{ item.value }}
    </button>

    <VueRender v-if="item.actionRender" :render-fn="item.actionRender" />
  </el-space>
</template>

<style lang="scss">
.option-item-action {
  .option-slider-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    .option-slider {
      width: 180px;
    }
    .number-input-wrap {
      width: 74px;
    }
  }
  .option-select {
    width: 200px;
    &.el-date-editor {
      width: 200px;
    }
  }
  .dynamic-tags {
    width: 250px;
  }
  .option-input {
    font-size: 12px;
  }
  .el-select-dropdown__list {
    text-align: left;
  }
}
</style>
