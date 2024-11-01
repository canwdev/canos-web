<script lang="ts" setup>
// 鼠标悬浮一定时间后，显示
import {useMouseOver} from '@/components/CanUI/packages/ViewPortWindow/utils/use-utils'
import {useMainStore} from '@/store/main'
import {useSystemStore} from '@/store/system'

const systemStore = useSystemStore()
const mainStore = useMainStore()

const isShowDesktop = ref(false)

const rootRef = ref()
useMouseOver(rootRef, {
  timeout: 500,
  onEnter: () => {
    mainStore.isPreviewDesktop = true
  },
  onOut: () => {
    mainStore.isPreviewDesktop = false
    isShowDesktop.value = false
  },
})

const handleShowDesktop = () => {
  systemStore.tasks.forEach((task) => {
    task.minimized = !isShowDesktop.value
  })
  isShowDesktop.value = !isShowDesktop.value
  mainStore.isPreviewDesktop = false
}
</script>

<template>
  <button @click="handleShowDesktop" ref="rootRef" class="tray-show-desktop btn-no-style"></button>
</template>

<style lang="scss" scoped>
.tray-show-desktop {
  border-left: 1px solid $color_border;
  height: 100%;
  width: 9px;
  &:hover {
    background-color: $color_border;
  }
}
</style>
