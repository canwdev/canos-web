<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'

import {SwitchOption} from '@/components/CommonUI/OptionUI/enum'

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
  <div class="rect-switch">
    <div
      v-for="item in options"
      :key="item.value"
      class="r-item"
      @click="mValue = item.value"
      :class="{active: item.value === mValue}"
    >
      {{ item.label }}
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

  .r-item {
    border-radius: 4px;
    padding: 5px 15px;
    font-size: 12px;
    transition: all 0.3s;
    cursor: pointer;

    &.active {
      background-color: $primary;
      color: white;
    }
  }
}
</style>
