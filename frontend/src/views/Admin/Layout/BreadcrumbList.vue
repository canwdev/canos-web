<script lang="ts">
import {defineComponent, onBeforeMount, ref, watch} from 'vue'
import {compile} from 'path-to-regexp'
import {RouteLocationMatched, useRoute, useRouter} from 'vue-router'

export default defineComponent({
  name: 'BreadcrumbList',
  setup() {
    const router = useRouter()
    const currentRoute = useRoute()

    const pathCompile = (path: string) => {
      const {params} = currentRoute
      const toPath = compile(path)
      return toPath(params)
    }

    const breadcrumbs = ref<Array<RouteLocationMatched>>([])

    const getBreadcrumb = () => {
      let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title)

      breadcrumbs.value = matched.filter((item) => {
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
    }

    const getLink = (item: any) => {
      const {name, path} = item
      if (name) {
        return {name}
      }
      return pathCompile(path)
    }

    watch(
      () => currentRoute.path,
      () => {
        getBreadcrumb()
      },
    )

    onBeforeMount(() => {
      getBreadcrumb()
    })
    return {
      breadcrumbs,
      getLink,
    }
  },
})
</script>

<template>
  <el-breadcrumb class="breadcrumb-list">
    <template v-for="(item, index) in breadcrumbs" :key="item.path">
      <el-breadcrumb-item v-if="item.meta && item.meta.parent">
        <RouterLink :to="getLink(item.meta.parent)">{{ item.meta.parent.title }}</RouterLink>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <RouterLink v-else :to="getLink(item)">{{ item.meta.title }}</RouterLink>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb-list {
  :deep(.el-breadcrumb__inner a) {
    font-weight: 500;
  }
}
</style>
