import {computed, reactive, watch} from 'vue'

export const usePaginationData = (defaultData: any = {}) => {
  const paginationData = reactive({
    totalItems: defaultData.totalItems || 0,
    pageSize: defaultData.pageSize || 10,
    currentPage: defaultData.currentPage || 1,
    totalPages: defaultData.totalPages || 0,
  })

  // 是否只有一个分页
  const isSinglePage = computed(() => {
    return paginationData.totalItems < paginationData.totalPages * paginationData.pageSize
  })

  // 已到达分页末尾
  const isReachedEnd = computed(() => {
    return paginationData.totalItems <= paginationData.currentPage * paginationData.pageSize
  })

  return {
    paginationData,
    isSinglePage,
    isReachedEnd,
  }
}
