<script lang="ts" setup>
import {CaretLeft20Regular} from '@vicons/fluent'
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
      <n-button
        text
        @click="mIsSidebarFold = !mIsSidebarFold"
        :class="{'btn-fold': mIsSidebarFold}"
      >
        <n-icon size="20">
          <CaretLeft20Regular />
        </n-icon>
      </n-button>
    </div>
    <div class="header-side">
      <n-dropdown
        v-if="mainStore.userInfo"
        trigger="hover"
        key-field="label"
        :options="userDropdownOptions"
      >
        <n-avatar :title="mainStore.userInfo.username" round>{{
          mainStore.userInfo.username
        }}</n-avatar>
      </n-dropdown>
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

  .n-avatar {
    user-select: none;
    cursor: pointer;
    :deep(.n-avatar__text) {
      font-size: 12px;
    }
  }
}
</style>
