<script setup lang="ts">
import OptionUI from '@/components/CanUI/packages/OptionUI/index.vue'
import type {StOptionItem} from '@/components/CanUI/packages/OptionUI/enum'
import {RouterLink, useRoute, useRouter} from 'vue-router'
import {adminRoutes} from '@/router/admin'

const props = withDefaults(
  defineProps<{
    isFolded?: boolean
  }>(),
  {
    isFolded: false,
  },
)

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
  router.push({name: 'AdminHome'})
}
</script>

<template>
  <div class="admin-sidebar" :class="{folded: isFolded}">
    <div @click="handleLogoClick" class="logo-wrap">
      <img src="../../../assets/images/logo.svg" alt="logo" />
      <span v-if="!isFolded">Admin System</span>
    </div>
    <OptionUI class="nav-list" :option-list="navOptions" />
  </div>
</template>

<style lang="scss" scoped>
.admin-sidebar {
  flex-shrink: 0;
  width: 250px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid $color_border;
  transition: all 0.2s;
  overflow-x: hidden;

  &.folded {
    width: 50px;
  }
  .logo-wrap {
    background-color: $primary;
    color: white;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 4px 10px;
    gap: 4px;
    font-weight: 600;
    font-size: 16px;
    img {
      height: 32px;
      width: auto;
    }
  }
  :deep(.c-panel-item .panel-body) {
    padding: 0;

    .sub-item {
      &.active {
        background-color: $primary_opacity;
      }
    }
  }

  .nav-list {
    min-width: 250px;
  }
}
</style>
