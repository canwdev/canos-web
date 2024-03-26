<script lang="ts">
import VueRender from '@/components/CommonUI/OptionUI/Tools/VueRender.vue'
import {defineComponent, PropType} from 'vue'
import ItemAction from './ItemAction.vue'
import {StOptionItem, StOptionType} from './enum'

export default defineComponent({
  name: 'OptionItem',
  components: {ItemAction, VueRender},
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

    const handleItemClick = (e: Event, fn: any) => {
      if (typeof fn === 'function') {
        fn(e, item.value)
      }
    }

    return {
      isExpanded,
      StOptionType,
      handleItemClick,
    }
  },
})
</script>

<template>
  <div class="c-panel-item" :class="[item.cls]">
    <div class="panel-header vp-bg">
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
          <svg
            style="width: 20px; height: 20px"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 20 20"
          >
            <g fill="none">
              <path
                d="M15.794 7.733a.75.75 0 0 1-.026 1.06l-5.25 5.001a.75.75 0 0 1-1.035 0l-5.25-5a.75.75 0 0 1 1.034-1.087l4.734 4.509l4.733-4.51a.75.75 0 0 1 1.06.027z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
        <ItemAction v-else :item="item" />
      </div>
    </div>

    <div v-if="item.children && item.children.length" v-show="isExpanded" class="panel-body">
      <div
        v-for="sItem in item.children"
        :key="sItem.key"
        class="sub-item"
        :class="{clickable: sItem.clickFn}"
        @click="handleItemClick($event, sItem.clickFn)"
      >
        <div class="o-left">
          <div v-if="sItem.iconRender" class="item-icon">
            <VueRender :render-fn="sItem.iconRender" />
          </div>
          <div v-else-if="sItem.icon" class="item-icon">
            <img :src="sItem.icon" alt="icon" />
          </div>
          <div class="item-title-wrap">
            <div class="item-label-wrap">
              <span class="item-label">{{ sItem.label }}</span>
              <n-popover v-if="sItem.tips" trigger="hover">
                <template #trigger>
                  <svg
                    style="width: 16px; height: 16px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 20 20"
                  >
                    <g fill="none">
                      <path
                        d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zm0 1a7 7 0 1 0 0 14a7 7 0 0 0 0-14zm0 10.5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5zm0-8a2.5 2.5 0 0 1 1.651 4.377l-.154.125l-.219.163l-.087.072a1.968 1.968 0 0 0-.156.149c-.339.36-.535.856-.535 1.614a.5.5 0 0 1-1 0c0-1.012.293-1.752.805-2.298a3.11 3.11 0 0 1 .356-.323l.247-.185l.118-.1A1.5 1.5 0 1 0 8.5 8a.5.5 0 0 1-1 .001A2.5 2.5 0 0 1 10 5.5z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
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

      &.clickable {
        cursor: pointer;
        &:hover {
          background-color: $color_border;
        }
      }

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
