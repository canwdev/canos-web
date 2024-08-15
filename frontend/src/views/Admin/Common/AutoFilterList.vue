<script setup lang="ts">
import {computed} from 'vue'
import AutoFormElPlus from '@/components/CanUI/packages/AutoFormElPlus/index.vue'
import {
  AutoFormItem,
  AutoFormItemType,
  AutoFormSchema,
  MixedFormItems,
} from '@/components/CanUI/packages/AutoFormElPlus/enum'
import {useRoute} from 'vue-router'
import {getFlatFormItems} from '@/components/CanUI/packages/AutoFormElPlus/utils'
import AutoTableElPlus from '@/components/CanUI/packages/AutoTableElPlus/index.vue'
import {AutoTableColumn} from '@/components/CanUI/packages/AutoTableElPlus/types'
import AutoTableElPlusTest from '@/components/CanUI/packages/AutoTableElPlus/AutoTableElPlusTest.vue'
import ListPagination from '@/components/CanUI/packages/AutoTableElPlus/ListPagination/index.vue'
import {usePaginationData} from '@/components/CanUI/packages/AutoTableElPlus/ListPagination/use'

const props = withDefaults(
  defineProps<{
    title?: string
    titleDesc?: string
    filterFormItems?: MixedFormItems[]
    tableColumns: AutoTableColumn[]
    requestDataFn: (any) => Promise<any>
    enablePagination?: boolean
  }>(),
  {
    enablePagination: false,
  },
)

const route = useRoute()
const pageTitle = computed(() => route.meta.title)

const {requestDataFn, filterFormItems, enablePagination} = toRefs(props)
const isLoading = ref(false)
const tableData = ref([])

const {paginationData} = usePaginationData()

const filterFormData = ref<any>({})
const filterFormSchema = computed((): AutoFormSchema | null => {
  if (!filterFormItems.value) {
    return null
  }
  return {
    model: filterFormData.value,
    props: {
      labelPlacement: 'left',
      size: 'small',
    },
    formItems: filterFormItems.value as AutoFormItem[],
  }
})

onBeforeMount(() => {
  if (filterFormItems.value) {
    // 初始化 filterFormData
    getFlatFormItems(filterFormItems.value).forEach((item: AutoFormItem) => {
      filterFormData.value[item.key] = undefined
    })
  }
})

async function loadData({isResetPage = false} = {}) {
  try {
    isLoading.value = true

    if (enablePagination.value && isResetPage) {
      paginationData.currentPage = 1
    }
    let params: any = {}
    if (enablePagination.value) {
      params = {
        page: paginationData.currentPage,
        limit: paginationData.pageSize,
      }
    }
    params = {
      ...params,
      ...filterFormData.value,
    }
    console.log(params)

    const res = await requestDataFn.value(params)
    if (!res) {
      throw Error('res is not exist')
    }
    // console.log(res)
    if (enablePagination.value) {
      tableData.value = res.results
      paginationData.totalItems = res.total
    } else {
      tableData.value = res
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})

defineExpose({
  loadData,
  isLoading,
})
</script>

<template>
  <div class="auto-list-wrap" v-loading="isLoading">
    <div class="common-title-row">
      <div class="common-title text-overflow" :title="titleDesc">
        {{ title || pageTitle }}
      </div>
      <div class="common-actions">
        <slot name="actions">
          <el-button @click="loadData"> Refresh </el-button>
        </slot>
        <slot name="actionsMore"> </slot>
      </div>
    </div>

    <div class="vp-panel filter-card" v-if="filterFormSchema">
      <AutoFormElPlus :form-schema="filterFormSchema" @onSubmit="loadData({isResetPage: true})" />
    </div>

    <div class="table-wrap">
      <AutoTableElPlus stripe border height="100%" :data="tableData" :columns="tableColumns" />
    </div>

    <ListPagination
      v-if="enablePagination"
      :pagination-data="paginationData"
      @sizeChange="loadData()"
      @currentChange="loadData()"
    />
  </div>
</template>

<style lang="scss" scoped>
.auto-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  height: 100%;
  min-width: 200px;

  @media screen and (max-width: 1200px) {
    padding: 10px;
    gap: 10px;
  }
  .common-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;

    .common-title {
      font-size: 24px;
      font-weight: bold;
      overflow: hidden;
      flex: 1;
    }

    .common-actions {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 8px;

      :deep(.el-button + .el-button) {
        margin-left: 0 !important;
      }
    }
  }

  .filter-card {
    padding: 10px;
  }

  .table-wrap {
    flex: 1;
    overflow: hidden;
  }

  .common-pagination-wrap {
    :deep(.el-pagination) {
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
    }
  }
}
</style>
