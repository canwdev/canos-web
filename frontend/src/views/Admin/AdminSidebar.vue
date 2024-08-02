<script setup lang="ts">
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import type {StOptionItem} from '@/components/CommonUI/OptionUI/enum'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {adminRoutes} from '@/router/admin'

const route = useRoute()
const router = useRouter()

const isChildrenActive = (item) => {
  if (item?.meta?.autoExpand) {
    return true
  }
  const resolved = router.resolve(item)
  // console.log({resolved, route})
  // console.log(`resolved.path: ${resolved.path}   route.path: ${route.path}`)
  return route.path.startsWith(resolved.path)
}

const generateRouteOptionItem = (item): StOptionItem => {
  return {
    label: item?.meta?.title || item.name,
    key: item.name,
    clickFn() {
      router.push({name: item.name})
    },
    cls: isChildrenActive(item) ? 'active' : '',
    // actionRender: h(
    //   RouterLink,
    //   {
    //     to: {name},
    //   },
    //   () => title,
    // ),
  }
}

const navOptions = computed((): StOptionItem[] => {
  return adminRoutes.map((group) => {
    const children: StOptionItem[] = []
    ;(group?.children || []).forEach((item) => {
      children.push(generateRouteOptionItem(item))
    })
    return {
      label: group?.meta?.title || group.name,
      key: group.name,
      children,
    }
  })
})

function handleLogoClick() {
  // globalEventBus.emit(GlobalEvents.TOGGLE_DRAWER)
}
</script>

<template>
  <div class="admin-sidebar">
    <div @click="handleLogoClick" class="logo-wrap">
      <img src="@/assets/vue.svg" alt="logo" />
    </div>
    <OptionUI :option-list="navOptions" />
  </div>
</template>

<style lang="scss" scoped>
.admin-sidebar {
  width: 250px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #000;
  .logo-wrap {
    padding: 10px;
    display: flex;
    cursor: pointer;
    img {
      height: 32px;
      width: auto;
    }
  }
  :deep(.c-panel-item .panel-body) {
    padding: 0;
  }
}
</style>
