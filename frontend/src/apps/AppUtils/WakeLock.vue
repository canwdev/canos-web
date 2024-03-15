<script setup lang="ts">
import {computed, reactive} from 'vue'
import {useWakeLock} from '@vueuse/core'

const wakeLock = reactive(useWakeLock())
const text = computed(() => (wakeLock.isActive ? '关闭唤醒锁定' : '开启唤醒锁定'))
function onClick() {
  return wakeLock.isActive ? wakeLock.release() : wakeLock.request('screen')
}
</script>

<template>
  <div class="wake-lock-wrap">
    <template v-if="wakeLock.isSupported">
      <div>保持计算机唤醒（不休眠）: {{ wakeLock.isActive ? '已开启' : '已关闭' }}</div>
      <button class="vp-button" @click="onClick">
        {{ text }}
      </button>
      <div>提示：必须保持此程序运行，并且浏览器在前台，否则功能失效。</div>
    </template>
    <template v-else> 该浏览器不支持唤醒锁定。 </template>
  </div>
</template>

<style lang="scss" scoped>
.wake-lock-wrap {
  padding: 10px;
  box-sizing: border-box;
  line-height: 2;
}
</style>
