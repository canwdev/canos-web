<script setup lang="ts">
import QuickOptions from './index.vue'
import {QuickOptionItem} from './enum'

interface Props {
  options: QuickOptionItem[]
}

const props = withDefaults(defineProps<Props>(), {})

const isShow = ref(false)
const xRef = ref(0)
const yRef = ref(0)

const menuWidth = ref(0)
const menuHeight = ref(0)

const menuRef = ref()
const updateCardHw = () => {
  setTimeout(() => {
    menuWidth.value = menuRef.value.quickRootRef.offsetWidth
    menuHeight.value = menuRef.value.quickRootRef.offsetHeight

    console.log(menuWidth.value, menuHeight.value)
  }, 0)
}
watch(isShow, (val) => {
  if (val) {
    updateCardHw()
  }
})

const ctxMenuStyle = computed(() => {
  let mx = xRef.value
  let my = yRef.value
  const wWidth = window.innerWidth
  const wHeight = window.innerHeight

  // 使其始终显示在屏幕内部而不超出
  const offset_left = wWidth - (mx + menuWidth.value)
  if (offset_left < 0) {
    mx += offset_left
  }
  if (mx < xRef.value) {
    mx = xRef.value - menuWidth.value
  }

  const offset_top = wHeight - (my + menuHeight.value)
  if (offset_top < 0) {
    my += offset_top
  }
  if (my < yRef.value) {
    my = yRef.value - menuHeight.value
  }

  return {
    position: 'fixed',
    left: mx + 'px',
    top: my + 'px',
    transform: 'none',
  }
})

const showMenu = (event: MouseEvent) => {
  xRef.value = event.clientX
  yRef.value = event.clientY
  event.preventDefault()
  isShow.value = true
}
defineExpose({
  showMenu,
  isShow,
})
</script>

<template>
  <QuickOptions
    ref="menuRef"
    v-model:visible="isShow"
    :options="options"
    @click.stop
    :style="ctxMenuStyle"
    v-bind="$attrs"
  />
</template>
