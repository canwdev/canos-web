<script lang="ts">
import {defineComponent, PropType} from 'vue'
import RectSwitch from './Tools/RectSwitch.vue'
import {StOptionItem, StOptionType} from './enum'
import VueRender from './Tools/VueRender.vue'

const swatches = [
  '#258292',
  '#3A6EA5',
  '#F0C869',
  '#E81123',
  '#e91e63',
  '#FFFFFF',
  '#000000',
  '#007aff',
  '#a2845e',
  '#8e8e93',
  '#28cd41',
  '#5856d6',
  '#ff9500',
  '#ff2d55',
  '#af52de',
  '#ff3b30',
  '#5ac8fa',
  '#ffcc00',
]

export default defineComponent({
  name: 'ItemAction',
  components: {VueRender, RectSwitch},
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
    <n-switch v-if="item.type === StOptionType.SWITCH" v-model:value="dynamicValue" />

    <RectSwitch
      v-else-if="item.type === StOptionType.MULTIPLE_SWITCH"
      :options="item.selectOptions"
      v-model="dynamicValue"
    />

    <div class="option-slider-wrap" v-else-if="item.type === StOptionType.SLIDER">
      <n-slider class="option-slider" v-model:value="dynamicValue" />
    </div>

    <n-select
      class="option-select"
      v-else-if="item.type === StOptionType.SELECT"
      v-model:value="dynamicValue"
      :options="item.selectOptions"
      value-field="value"
      label-field="label"
      size="small"
    />

    <n-input
      class="option-select option-input"
      v-else-if="item.type === StOptionType.INPUT"
      v-model:value="dynamicValue"
      size="small"
      type="text"
      clearable
      :placeholder="item.placeholder || ''"
    />

    <n-color-picker
      class="option-select"
      v-else-if="item.type === StOptionType.COLOR_PICKER"
      v-model:value="dynamicValue"
      size="small"
      :swatches="swatches"
      :show-alpha="false"
      :actions="['clear']"
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
  .option-input {
    font-size: 12px;
  }
}
</style>
