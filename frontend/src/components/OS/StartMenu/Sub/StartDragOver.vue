<script setup lang="ts">
const isOver = ref(false)
const handleDragOver = () => {
  isOver.value = true
}
const handleDragLeave = () => {
  isOver.value = false
}
const handleDrop = () => {
  isOver.value = false
}
</script>

<template>
  <div
    class="temp-content"
    :class="{isOver}"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  ></div>
</template>

<style scoped lang="scss">
.temp-content {
  background-color: #fff;
  padding: 30px;
  opacity: 0.05;
  transition: all 0.8s;
  &.isOver {
    opacity: 0.5;
  }
}
</style>
