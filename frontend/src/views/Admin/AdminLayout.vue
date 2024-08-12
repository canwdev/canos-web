<script lang="ts" setup>
import AdminSidebar from '@/views/Admin/AdminSidebar.vue'
import AdminHeader from '@/views/Admin/AdminHeader.vue'
import {useStorage} from '@vueuse/core'

const isSidebarFold = useStorage('ls_key_admin_is_sidebar_fold', false)
</script>

<template>
  <div class="manage-layout vp-bg">
    <AdminSidebar :is-folded="isSidebarFold" />
    <div class="manage-right">
      <AdminHeader v-model:isSidebarFold="isSidebarFold" />
      <div class="manage-content">
        <AutoRouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage-layout {
  height: 100%;
  display: flex;
  overflow: hidden;
  .manage-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .manage-content {
      flex: 1;
      padding: 10px;
      overflow: auto;
    }
  }

  .manage-page {
    padding: 10px;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
