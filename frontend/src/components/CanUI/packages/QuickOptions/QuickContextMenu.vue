<script setup lang="ts">
import QuickOptions from './index.vue'
import {QuickOptionItem} from './enum'
import {useContextMenu} from './utils/use-context-menu'

const props = withDefaults(
  defineProps<{
    options: QuickOptionItem[]
    transitionName?: string
  }>(),
  {
    transitionName: 'fade',
  },
)

const {menuRef, isShow, ctxMenuStyle, showMenu, showMenuByPoint, showMenuByElement, hideMenu} =
  useContextMenu()

defineExpose({
  isShow,
  menuRef,
  showMenu,
  showMenuByPoint,
  showMenuByElement,
  hideMenu,
})
</script>

<template>
  <transition :name="transitionName">
    <QuickOptions
      ref="menuRef"
      v-model:visible="isShow"
      :options="options"
      @click.stop
      :style="ctxMenuStyle"
      v-bind="$attrs"
      :show-index="false"
    />
  </transition>
</template>
