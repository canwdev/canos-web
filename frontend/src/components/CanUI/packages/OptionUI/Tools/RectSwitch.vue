<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'

import {SwitchOption} from '../enum'

export default defineComponent({
  name: 'RectSwitch',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    options: {
      type: Array as PropType<SwitchOption[]>,
      default() {
        return []
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isLabelHtml: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const mValue = useModelWrapper(props, emit)
    return {
      mValue,
    }
  },
})
</script>

<template>
  <div class="rect-switch" :class="{disabled}">
    <div
      v-for="item in options"
      :key="item.value"
      class="r-item"
      @click="mValue = item.value"
      :class="{active: item.value === mValue}"
    >
      <div v-if="isLabelHtml" v-html="item.label"></div>
      <template v-else>
        {{ item.label || item.value }}
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.rect-switch {
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 2px;
  border: 1px solid $color_border;
  flex-wrap: wrap;

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed !important;
    .r-item {
      pointer-events: none;
    }
  }

  .r-item {
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;
    line-height: 1.3;
    text-align: center;

    &.active {
      background-color: $primary;
      color: white;
    }
  }
}
</style>
