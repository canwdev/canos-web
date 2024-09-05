<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import VueRender from '@/components/CanUI/packages/OptionUI/Tools/VueRender.vue'
type TabItem = {
  label?: string
  value: string | number
  title?: string
  render?: any
}

export default defineComponent({
  name: 'TabLayout',
  components: {VueRender},
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<TabItem[]>,
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
  <div class="mc-vertical-tab-layout vp-bg" :class="{horizontal}">
    <div class="sidebar-wrap">
      <div class="mc-tab-list">
        <div
          v-for="item in options"
          :key="item.value"
          :class="{active: item.value === mValue}"
          @click="mValue = item.value"
          class="list-item"
          :title="item.title"
        >
          <VueRender v-if="item.render" :render-fn="item.render"></VueRender>
          <div v-if="item.label" class="item-text">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mc-vertical-tab-layout {
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
  line-height: 1.6;

  .sidebar-wrap {
    width: 120px;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid $color_border;

    .mc-tab-list {
      .list-item {
        padding: 4px 8px;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: $color_border;
        }

        &.active {
          background-color: $primary_opacity;
        }

        .item-text {
        }
      }
    }
  }

  &.horizontal {
    overflow: unset;
    justify-content: flex-start;

    .sidebar-wrap {
      min-width: fit-content;
      width: auto;
      border-right: 0;
      border-bottom: 1px solid $color_border;
      overflow: hidden;
      .mc-tab-list {
        display: flex;
        .list-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .content-wrap {
    flex: 1;
    overflow-y: auto;
    height: 100%;
  }
}
</style>
