<script lang="ts" setup>
const isKeepAlive = (route: any) => {
  // return route.meta && route.meta.keepAlive
  if (!route.meta) {
    return true
  }
  return route.meta && route.meta.keepAlive !== false
}
</script>
<template>
  <router-view class="auto-router-view" v-slot="{Component, route}">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="isKeepAlive(route)" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!isKeepAlive(route)" />
  </router-view>
</template>
<style lang="scss">
.auto-router-view {
  height: 100%;
}
</style>
