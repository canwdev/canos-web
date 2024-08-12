<script setup lang="ts">
import QuickOptions from '../index.vue'
import {QuickOptionItem} from '../enum'
import {useContextMenu} from './use-context-menu'

interface Props {
  options: QuickOptionItem[]
}

const props = withDefaults(defineProps<Props>(), {})

const {menuRef, ctxMenuStyle, showMenu, isShow} = useContextMenu()

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
    :show-index="false"
  />
</template>
