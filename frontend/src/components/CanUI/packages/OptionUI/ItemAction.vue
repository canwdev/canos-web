<script lang="ts">
import {defineComponent, PropType} from 'vue'
import RectSwitch from './Tools/RectSwitch.vue'
import {StOptionItem, StOptionType, swatches} from './enum'
import VueRender from './Tools/VueRender.vue'
import AdvancedNumberInput from './Tools/AdvancedNumberInput.vue'

export default defineComponent({
  name: 'ItemAction',
  components: {AdvancedNumberInput, VueRender, RectSwitch},
  props: {
    item: {
      type: Object as PropType<StOptionItem>,
      required: true,
    },
  },
  setup(props, {emit}) {
    const {item} = toRefs(props)
    const dynamicValue = computed({
      get() {
        if (item.value.store) {
          return item.value.store[item.value.key]
        }
        return item.value.value
      },
      set(val) {
        if (item.value.store) {
          item.value.store[item.value.key] = val
          return
        }
        item.value.value = val
      },
    })
    return {
      StOptionType,
      dynamicValue,
      swatches,
    }
  },
})
</script>

<template>
  <n-space class="option-item-action" size="small" align="center">
    <n-switch
      v-if="item.type === StOptionType.SWITCH"
      v-model:value="dynamicValue"
      v-bind="item.props"
    />

    <RectSwitch
      v-else-if="item.type === StOptionType.MULTIPLE_SWITCH"
      :options="item.options"
      v-model="dynamicValue"
      v-bind="item.props"
    />

    <div class="option-slider-wrap" v-else-if="item.type === StOptionType.SLIDER">
      <n-slider class="option-slider" v-model:value="dynamicValue" v-bind="item.props" />
    </div>

    <n-select
      class="option-select"
      v-else-if="item.type === StOptionType.SELECT"
      v-model:value="dynamicValue"
      :options="item.options"
      value-field="value"
      label-field="label"
      size="small"
      v-bind="item.props"
    />

    <n-input
      class="option-select option-input"
      v-else-if="item.type === StOptionType.INPUT"
      v-model:value="dynamicValue"
      size="small"
      type="text"
      clearable
      :placeholder="item.placeholder || ''"
      v-bind="item.props"
    />

    <n-color-picker
      class="option-select"
      v-else-if="item.type === StOptionType.COLOR_PICKER"
      v-model:value="dynamicValue"
      size="small"
      :swatches="swatches"
      :show-alpha="false"
      :actions="['clear']"
      :modes="['hex']"
      v-bind="item.props"
    />

    <n-dynamic-tags
      class="dynamic-tags"
      v-else-if="item.type === StOptionType.DYNAMIC_TAGS"
      v-model:value="dynamicValue"
      size="small"
      v-bind="item.props"
    />

    <!-- 高级的数字输入框-->
    <AdvancedNumberInput
      v-else-if="item.type === StOptionType.INPUT_NUMBER"
      v-model="dynamicValue"
      :disabled="item.disabled"
      v-bind="item.props"
    />

    <VueRender v-if="item.actionRender" :render-fn="item.actionRender" />
  </n-space>
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
    width: 180px;
  }
  .dynamic-tags {
    width: 250px;
  }
  .option-input {
    font-size: 12px;
  }
}
</style>
