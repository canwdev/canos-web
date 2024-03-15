<script lang="ts" setup>
import {useMemory} from '@vueuse/core'

function size(v: number) {
  const kb = v / 1024 / 1024
  return `${kb.toFixed(2)} MB`
}
const {isSupported, memory} = useMemory()

const percent = computed(() => {
  if (!isSupported.value || !memory.value) {
    return 0
  }
  return (memory.value.usedJSHeapSize / memory.value.totalJSHeapSize) * 100
})
const titleDisplay = computed(() => {
  if (!isSupported.value) {
    return 'Your browser does not support performance memory API'
  }
  if (!memory.value) {
    return '...'
  }
  return `Memory
Used: ${size(memory.value.usedJSHeapSize)}
Allocated: ${size(memory.value.totalJSHeapSize)}
Limit: ${size(memory.value.jsHeapSizeLimit)}
`
})
</script>

<template>
  <n-tooltip v-if="isSupported" trigger="hover">
    <template #trigger>
      <div class="tray-icon">
        <div class="status-bar">
          <div class="status-value" :style="{height: `${percent}%`}"></div>
          <div class="status-display">
            {{ percent.toFixed(0) }}
          </div>
        </div>
      </div>
    </template>
    <div class="font-code" style="white-space: pre-wrap">
      {{ titleDisplay }}
    </div>
  </n-tooltip>
</template>

<style lang="scss" scoped>
.status-bar {
  width: 15px;
  height: 15px;
  position: relative;
  overflow: hidden;
  background-color: $primary_opacity;
  outline: 1px solid $primary;
  .status-value {
    position: absolute;
    height: 0%;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $primary;
    transition: all 0.3s;
  }
  .status-display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 10px;
    line-height: 1;
  }
}
</style>
