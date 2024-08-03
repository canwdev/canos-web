<script setup lang="ts">
import {computed} from 'vue'
import AutoFormElPlus from '@/components/CommonUI/AutoFormNaive/index.vue'
import {
  AutoFormItem,
  AutoFormItemType,
  AutoFormSchema,
  MixedFormItems,
} from '@/components/CommonUI/AutoFormNaive/enum'
import {DataTableColumn} from 'naive-ui'
import {useRoute} from 'vue-router'
import {ArrowSync16Regular} from '@vicons/fluent'
import {getFlatFormItems} from '@/components/CommonUI/AutoFormNaive/utils'

const props = withDefaults(
  defineProps<{
    title?: string
    titleDesc?: string
    filterFormItems?: MixedFormItems[]
    tableColumns: DataTableColumn[]
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
const pageNumber = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

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
      pageNumber.value = 1
    }
    let params: any = {}
    if (enablePagination.value) {
      params = {
        offset: (pageNumber.value - 1) * pageSize.value,
        limit: pageSize.value,
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
      tableData.value = res.list
      totalCount.value = res.count
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
  <div class="auto-list-wrap">
    <div class="common-title-row">
      <div class="common-title text-overflow" :title="titleDesc">
        {{ title || pageTitle }}
      </div>
      <div class="common-actions">
        <slot name="actions">
          <n-button @click="loadData">
            <n-icon size="16"> <ArrowSync16Regular /> </n-icon> Refresh
          </n-button>
        </slot>
        <slot name="actionsMore"> </slot>
      </div>
    </div>

    <n-card size="small" class="filter-card" v-if="filterFormSchema">
      <AutoFormElPlus :form-schema="filterFormSchema" @onSubmit="loadData({isResetPage: true})" />
    </n-card>
    <n-data-table size="small" :data="tableData" :columns="tableColumns" :loading="isLoading" />

    <n-pagination
      v-if="enablePagination"
      :disabled="isLoading"
      class="table-pagination"
      v-model:page="pageNumber"
      v-model:page-size="pageSize"
      show-size-picker
      :page-sizes="[10, 50, 100, 200, 500]"
      :item-count="totalCount"
      show-quick-jumper
      @update:page-size="loadData"
      @update:page="loadData"
    >
      <template #prefix="{itemCount, startIndex}"> 共 {{ itemCount }} 项 </template>
    </n-pagination>
  </div>
</template>

<style lang="scss" scoped>
.auto-list-wrap {
  .common-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 8px;

    @media screen and (max-width: $mq_pc_min_width) {
      margin-bottom: 15px;
    }

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
    }
  }

  .filter-card {
    margin-bottom: 10px;
    :deep(.n-form-item-feedback-wrapper) {
      display: none;
    }
    :deep(.auto-form-actions) {
      margin-top: 8px;
    }
  }
  .table-pagination {
    margin-top: 10px;
  }
}
</style>
