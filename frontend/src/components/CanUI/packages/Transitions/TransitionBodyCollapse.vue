<script lang="ts" setup>
/**
 * 参考：https://wxsm.space/2017/vue-transition-height
 */
const transitionHeightHooks = {
  enter(el: HTMLElement) {
    el.style.height = 'auto'
    // 获取其实际高度
    let endWidth = window.getComputedStyle(el).height
    el.style.height = '0px'
    el.offsetHeight // 强制浏览器重绘
    el.style.overflow = 'hidden'
    // 将其高度设置为第一步取得的实际高度
    el.style.height = endWidth
  },
  afterEnter(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
  },
  leave(el: HTMLElement) {
    el.style.height = window.getComputedStyle(el).height
    el.offsetHeight // 强制浏览器重绘
    el.style.overflow = 'hidden'
    el.style.height = '0px'
  },
  afterLeave(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <Transition
    @enter="transitionHeightHooks.enter"
    @after-enter="transitionHeightHooks.afterEnter"
    @leave="transitionHeightHooks.leave"
    @after-leave="transitionHeightHooks.afterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
