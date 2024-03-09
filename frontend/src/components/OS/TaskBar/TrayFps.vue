<script lang="ts" setup>
import {useFps} from '@vueuse/core'

const fps = useFps()
</script>

<template>
  <div class="tray-fps">FPS: {{ fps }}</div>
</template>

<style lang="scss" scoped>
.tray-fps {
  display: inline-flex;
  font-size: 10px;
}
</style>
