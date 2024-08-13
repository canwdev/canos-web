<script lang="ts" setup>
interface Props {
  options: any[]
  props?: any
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <el-dropdown v-bind="props">
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
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in options" :key="index" v-bind="item.props">{{
          item.label
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
