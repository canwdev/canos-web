<script lang="ts" setup>
import AutoRouterView from '@/components/CommonUI/AutoRouterView.vue'
import ManageSidebar from '@/views/Admin/ManageSidebar.vue'
</script>

<template>
  <div class="manage-layout">
    <ManageSidebar />
    <div class="manage-content">
      <AutoRouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage-layout {
  height: 100%;
  display: flex;
  overflow: hidden;
  .manage-content {
    flex: 1;
  }

  .manage-page {
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
