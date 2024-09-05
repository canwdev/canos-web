<script lang="ts" setup>
const isKeepAlive = (route: any) => {
  // return route.meta && route.meta.keepAlive
  if (!route.meta) {
    return true
  }
  return route.meta && route.meta.keepAlive
}
</script>
<template>
  <router-view v-slot="{Component, route}">
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="isKeepAlive(route)" />
    </keep-alive>
    <component :is="Component" :key="route.name" v-if="!isKeepAlive(route)" />
  </router-view>
</template>
