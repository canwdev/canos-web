<script lang="ts">
import {defineComponent, PropType} from 'vue'
import ItemAction from './ItemAction.vue'
import {ChevronDown20Regular, QuestionCircle20Regular} from '@vicons/fluent'
import {StOptionItem, StOptionType} from './enum'

export default defineComponent({
  name: 'OptionItem',
  components: {QuestionCircle20Regular, ItemAction, ChevronDown20Regular},
  props: {
    item: {
      type: Object as PropType<StOptionItem>,
      required: true,
    },
    foldedKeyMap: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props, {emit}) {
    const {item, foldedKeyMap} = toRefs(props)

    const isExpanded = computed(() => {
      return !foldedKeyMap.value[item.value.key]
    })

    return {
      isExpanded,
      StOptionType,
    }
  },
})
</script>

<template>
  <div class="c-panel-item" :class="[item.cls]">
    <div class="panel-header">
      <div class="p-left">
        <div class="item-label">{{ item.label }}</div>
      </div>
      <div class="p-right">
        <div
          class="btn-no-style btn-toggle-expand"
          :class="{expanded: isExpanded}"
          v-if="item.children && item.children.length"
          @click="$emit('onToggleExpand', item)"
        >
          <n-icon size="20">
            <ChevronDown20Regular />
          </n-icon>
        </div>
        <ItemAction v-else :item="item" />
      </div>
    </div>

    <div v-if="item.children && item.children.length" v-show="isExpanded" class="panel-body">
      <div v-for="sItem in item.children" :key="sItem.key" class="sub-item">
        <div class="o-left">
          <div v-if="sItem.icon" class="item-icon">
            <img :src="sItem.icon" alt="icon" />
          </div>
          <div class="item-title-wrap">
            <div class="item-label-wrap">
              <span class="item-label">{{ sItem.label }}</span>
              <n-popover v-if="sItem.tips" trigger="hover">
                <template #trigger>
                  <n-icon size="16">
                    <QuestionCircle20Regular />
                  </n-icon>
                </template>
                <span v-html="sItem.tips"></span>
              </n-popover>
            </div>
            <div class="item-subtitle" v-if="sItem.subtitle" v-html="sItem.subtitle"></div>
          </div>
        </div>
        <div class="o-right">
          <ItemAction :item="sItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-panel-item {
  .panel-header {
    min-height: 40px;
    padding: 4px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    border-bottom: 1px dashed $color_border;
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
    z-index: 2;

    .p-left,
    .p-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .btn-reset,
    .btn-toggle-expand {
      display: inline-flex;
      transition: all 0.3s;
      padding: 8px;
    }

    .btn-toggle-expand {
      &.expanded {
        transform: rotateX(180deg);
      }
    }
  }

  .panel-body {
    padding-top: 8px;
    padding-bottom: 8px;

    .sub-item {
      min-height: 40px;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .o-left {
        display: flex;
        align-items: center;
        .item-icon {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          margin-right: 16px;
          display: inline-flex;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .item-title-wrap {
          line-height: 1.3;
        }

        .item-label-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .item-subtitle {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
