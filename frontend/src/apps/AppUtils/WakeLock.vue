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
  <div class="wake-lock-wrap" :class="{active: wakeLock.isActive}">
    <template v-if="wakeLock.isSupported">
      <div>
        保持唤醒（不休眠）:
        {{ wakeLock.isActive ? '已开启✅' : '已关闭🛑' }}
      </div>
      <button class="vgo-button" @click="onClick">
        {{ text }}
      </button>
      <div>提示：必须保持此页面在前台运行，否则无效。</div>
    </template>
    <template v-else> 该浏览器不支持唤醒锁定。 </template>
  </div>
</template>

<style lang="scss" scoped>
.wake-lock-wrap {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  line-height: 2;
}
</style>
