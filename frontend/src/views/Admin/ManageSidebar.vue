<script setup lang="ts">
import OptionUI from '@/components/CommonUI/OptionUI/index.vue'
import type {StOptionItem} from '@/components/CommonUI/OptionUI/enum'
import {RouterLink, useRouter} from 'vue-router'
import {adminRoutes} from '@/router/admin'

const router = useRouter()

const generateRouteOptionItem = (title: string, name: string): StOptionItem => {
  return {
    label: title,
    key: name,
    // clickFn() {
    //   router.push({name})
    // },
    actionRender: h(
      RouterLink,
      {
        to: {name},
      },
      () => title,
    ),
  }
}

const navList = computed((): StOptionItem[] => {
  const list: StOptionItem[] = []
  adminRoutes.forEach((group) => {
    const children: StOptionItem[] = []
    ;(group?.children || []).forEach((item) => {
      children.push(generateRouteOptionItem(item?.meta?.title || item.name, item.name))
    })
    list.push({
      label: group?.meta?.title || group.name,
      key: group.name,
      children,
    })
  })
  return list
})

function handleLogoClick() {
  // globalEventBus.emit(GlobalEvents.TOGGLE_DRAWER)
}
</script>

<template>
  <div class="manage-sidebar">
    <div @click="handleLogoClick" class="logo-wrap">
      <img src="@/assets/vue.svg" alt="logo" />
    </div>
    <OptionUI :option-list="navList" />
  </div>
</template>

<style lang="scss" scoped>
.manage-sidebar {
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
}
</style>
