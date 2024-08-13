<script lang="ts" setup>
import {useMainStore} from '@/store/main'
import globalEventBus, {GlobalEvents} from '@/utils/bus'
import {useVModel} from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    isSidebarFold?: boolean
  }>(),
  {
    isSidebarFold: false,
  },
)
const emit = defineEmits(['update:isSidebarFold'])
const mIsSidebarFold = useVModel(props, 'isSidebarFold', emit)

const mainStore = useMainStore()

const userDropdownOptions = computed(() => {
  return [
    {
      label: 'Logout',
      props: {
        onClick: () => {
          globalEventBus.emit(GlobalEvents.GLOBAL_EVENT_LOGOUT)
        },
      },
    },
  ]
})
</script>

<template>
  <div class="admin-header">
    <div class="header-side">
      <el-button
        text
        @click="mIsSidebarFold = !mIsSidebarFold"
        :class="{'btn-fold': mIsSidebarFold}"
      >
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 20 20"
        >
          <g fill="none">
            <path
              d="M11.372 14.982A1 1 0 0 0 13 14.204V5.797a1 1 0 0 0-1.628-.778L6.649 8.833a1.5 1.5 0 0 0 0 2.334l4.723 3.815zM12 5.797v8.407l-4.722-3.815a.5.5 0 0 1 0-.778L12 5.797z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </el-button>
    </div>
    <div class="header-side">
      <DropdownMenu
        v-if="mainStore.userInfo"
        trigger="hover"
        key-field="label"
        :options="userDropdownOptions"
      >
        <el-avatar :size="34" :title="mainStore.userInfo.username">
          {{ mainStore.userInfo.username }}
        </el-avatar>
      </DropdownMenu>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-header {
  height: 50px;
  border-bottom: 1px solid $color_border;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  flex-wrap: wrap;
  gap: 8px;
  .header-side {
    display: flex;
    gap: 8px;
  }

  .btn-fold {
    transform: rotateY(180deg);
  }

  .el-avatar {
    user-select: none;
    cursor: pointer;
    font-size: 12px;
  }
}
</style>
