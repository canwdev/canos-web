<script setup lang="ts">
import {StartLayoutGroup} from '@/components/OS/StartMenu/types'
import {onClickOutside} from '@vueuse/core'

interface Props {
  group: StartLayoutGroup
}
const props = withDefaults(defineProps<Props>(), {})
const isEditing = ref()

const inputRef = ref()
const enterEditing = () => {
  isEditing.value = true
  setTimeout(() => {
    inputRef.value.focus()
  })
}
const exitEditing = () => {
  isEditing.value = false
}
onClickOutside(inputRef, (event) => {
  isEditing.value = false
})
</script>

<template>
  <div class="group-title">
    <input
      ref="inputRef"
      v-if="isEditing"
      v-model="group.title"
      class="vp-input title-inner"
      @keyup.enter="exitEditing"
      style="width: 100%"
      @dragstart.stop
    />
    <span class="text-overflow title-inner" @click="enterEditing" v-else draggable="true">
      {{ group.title }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.group-title {
  font-size: 16px;
  margin-bottom: 10px;
  .title-inner {
    width: 100%;
    display: block;
  }
}
</style>
