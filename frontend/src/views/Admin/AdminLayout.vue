<script lang="ts" setup>
import AutoRouterView from '@/components/CommonUI/AutoRouterView.vue'
import AdminSidebar from '@/views/Admin/AdminSidebar.vue'
</script>

<template>
  <div class="manage-layout">
    <AdminSidebar />
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
    padding: 20px;
  }

  .manage-page {
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
