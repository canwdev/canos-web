<script setup lang="ts">
import AutoTableElPlus from '@/components/CanUI/packages/AutoTableElPlus/index.vue'
import {AutoTableColumn} from '@/components/CanUI/packages/AutoTableElPlus/types'
import {EntrustSide, ITransactionHistory} from '@/apps/AppUtils/StockTracker/types'
import {useResizeObserver} from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    historyList: ITransactionHistory[]
  }>(),
  {},
)
const emit = defineEmits([])
const {historyList} = toRefs(props)

const filterData = ref({
  filterSymbol: '',
})

const filteredList = ref<ITransactionHistory[]>([])
const updateFilteredList = () => {
  const {filterSymbol} = filterData.value
  if (!filterSymbol) {
    filteredList.value = historyList.value
    return
  }
  filteredList.value = historyList.value.filter((item) => {
    return (item.symbol || '').toLowerCase().includes((filterSymbol || '').toLowerCase())
  })
}

watch(
  historyList,
  (val) => {
    updateFilteredList()
  },
  {immediate: true},
)

const tableColumns: AutoTableColumn[] = [
  {key: 'symbol', label: '股票代码', fixed: 'left'},
  {key: 'symbolName', label: '股票名称'},
  {key: 'entrustSide', label: '委托方向'},
  // {key: 'entrustPrice', label: '委托价格'},
  {key: 'businessAvgPrice', label: '成交均价'},
  {key: 'businessQty', label: '成交数量'},
  {key: 'statusName', label: '状态名称'},
  {key: 'currency', label: '货币类型'},
  {key: 'createDate', label: '创建日期', width: 120},
  {key: 'createTime', label: '创建时间'},
]

const rootRef = ref()
const maxHeight = ref(300)
useResizeObserver(rootRef, (entries) => {
  const entry = entries[0]
  const {width, height} = entry.contentRect
  maxHeight.value = height
})
</script>

<template>
  <div class="transaction-history-wrapper">
    <div class="filter-row flex-row-center-gap">
      <el-input
        clearable
        placeholder="过滤股票代码"
        v-model="filterData.filterSymbol"
        @change="updateFilteredList"
      />
    </div>
    <div ref="rootRef" class="transaction-history">
      <AutoTableElPlus
        class="table-ui"
        :data="filteredList"
        :columns="tableColumns"
        :height="maxHeight"
      />
    </div>

    <div class="st-row flex-row-center-gap">{{ filteredList.length }} items</div>
  </div>
</template>

<style lang="scss" scoped>
.transaction-history-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .filter-row {
    padding: 4px;
  }
  .st-row {
    padding: 4px 8px;
  }
  .transaction-history {
    flex: 1;
    overflow: hidden;
  }
}
</style>
