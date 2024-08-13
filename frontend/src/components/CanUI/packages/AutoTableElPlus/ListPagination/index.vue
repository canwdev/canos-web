<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {defineComponent, onBeforeMount, toRefs} from 'vue'

export default defineComponent({
  name: 'ListPagination',
  props: {
    paginationData: {
      type: Object,
      required: true,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    updateRouter: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: null,
    },
  },
  emits: ['sizeChange', 'currentChange', 'pageInitReady'],
  setup(props, {emit}) {
    const {paginationData, updateRouter} = toRefs(props)
    const route = useRoute()
    const router = useRouter()

    const handlePageSizeChange = (size) => {
      // console.log('[handlePageSizeChange]', size)
      if (updateRouter.value) {
        const queryOrigin = route.query as any
        // 标记当前是否为最后一页
        const isEnd =
          parseInt(queryOrigin.pageNum) ===
          Math.ceil(paginationData.value.totalItems / queryOrigin.pageSize)

        // 计算最后一页页数
        if (isEnd) {
          paginationData.value.currentPage = Math.ceil(paginationData.value.totalItems / size)
        }
        router.replace({
          query: {
            ...queryOrigin,
            pageSize: size,
            pageNum: paginationData.value.currentPage,
          },
        })
      }
      emit('sizeChange', size)
    }
    const handlePageCurrentChange = (page) => {
      if (page < 0) {
        page = 1
      }
      // console.log('[handlePageCurrentChange]', page)
      if (updateRouter.value) {
        const queryOrigin = route.query
        router.replace({
          query: {
            ...queryOrigin,
            pageNum: page,
          },
        })
      }
      emit('currentChange', page)
    }

    onBeforeMount(() => {
      if (updateRouter.value) {
        let pageSize = Number(route.query.pageSize)
        let pageNum = Number(route.query.pageNum)
        if (!Number.isNaN(pageSize)) {
          paginationData.value.pageSize = pageSize
        }
        if (!Number.isNaN(pageNum)) {
          if (pageNum < 0) {
            pageNum = 1
          }
          paginationData.value.currentPage = pageNum
        }
      }
      emit('pageInitReady')
    })

    return {
      handlePageSizeChange,
      handlePageCurrentChange,
    }
  },
})
</script>

<template>
  <div class="common-pagination-wrap">
    <el-pagination
      v-model:current-page="paginationData.currentPage"
      v-model:page-size="paginationData.pageSize"
      :hide-on-single-page="hideOnSinglePage"
      :total="paginationData.totalItems"
      :page-sizes="pageSizes || [5, 10, 20, 50, 100, 200, 500]"
      :layout="layout"
      @size-change="handlePageSizeChange"
      @current-change="handlePageCurrentChange"
    />
  </div>
</template>
