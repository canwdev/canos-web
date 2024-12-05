<script setup lang="ts">
import AutoTableElPlus from '@/components/CanUI/packages/AutoTableElPlus/index.vue'
import {AutoTableColumn} from '@/components/CanUI/packages/AutoTableElPlus/types'
import {EntrustSide, ITransactionHistory} from '@/apps/AppUtils/StockTracker/types'

const props = withDefaults(
  defineProps<{
    historyList: ITransactionHistory[]
  }>(),
  {},
)
const emit = defineEmits([])
const {historyList} = toRefs(props)

const tableColumns: AutoTableColumn[] = [
  {key: 'symbol', label: '股票代码'},
  {key: 'symbolName', label: '股票名称'},
  {key: 'entrustSide', label: '委托方向'},
  {key: 'entrustAmount', label: '委托金额'},
  {key: 'entrustPrice', label: '委托价格'},
  {key: 'statusName', label: '状态名称'},
  {key: 'businessAvgPrice', label: '成交平均价格'},
  {key: 'businessQty', label: '成交数量'},
  {key: 'currency', label: '货币类型'},
  {key: 'createDate', label: '创建日期'},
  {key: 'createTime', label: '创建时间'},
]
</script>

<template>
  <div class="transaction-history">
    <AutoTableElPlus :data="historyList" :columns="tableColumns" />
  </div>
</template>

<style lang="scss" scoped>
.transaction-history {
}
</style>
