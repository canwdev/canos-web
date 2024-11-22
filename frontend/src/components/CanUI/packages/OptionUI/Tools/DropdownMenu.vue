<script lang="ts" setup>
import QuickOptions from '@/components/CanUI/packages/QuickOptions/index.vue'
import {QuickOptionItem} from '@/components/CanUI/packages/QuickOptions/enum'

interface Props {
  options: QuickOptionItem[]
  props?: any
}

const props = withDefaults(defineProps<Props>(), {})
const visible = ref(false)

let timer = ref()
const handleVisibleChange = (val) => {
  clearTimeout(timer.value)
  if (!val) {
    timer.value = setTimeout(() => {
      visible.value = false
    }, 300)
  } else {
    visible.value = true
  }
}
</script>

<template>
  <el-dropdown
    v-bind="props"
    :options="null"
    popper-class="vp-dropdown-popper-wrap"
    @visible-change="handleVisibleChange"
  >
    <slot>
      <button class="btn-no-style">
        <svg
          style="width: 20px; height: 20px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 20 20"
        >
          <g fill="none">
            <path
              d="M10 6a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 10 6zm0 5.25a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5zm-1.25 4a1.25 1.25 0 1 0 2.5 0a1.25 1.25 0 0 0-2.5 0z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </button>
    </slot>
    <template #dropdown>
      <QuickOptions v-if="visible" :options="options" visible :show-index="false" />
    </template>
  </el-dropdown>
</template>

<style lang="scss">
.vp-dropdown-popper-wrap {
  .el-dropdown__list {
    & > .quick-options {
      border: none !important;
      overflow: hidden;
      .quick-options {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
