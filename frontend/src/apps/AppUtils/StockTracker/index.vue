<script setup lang="ts">
import TabLayout from '@/components/CanUI/packages/Layouts/TabLayout.vue'
import StockStatistics from '@/apps/AppUtils/StockTracker/StockStatistics.vue'
import TransactionHistory from '@/apps/AppUtils/StockTracker/TransactionHistory.vue'
import {ITransactionHistory} from '@/apps/AppUtils/StockTracker/types'
import RectSwitch from '@/components/CanUI/packages/OptionUI/Tools/RectSwitch.vue'

const transactionHistoryList = ref<ITransactionHistory[]>([])
const loadData = async () => {
  let {
    data: {list},
  } = await fetch('http://127.0.0.1:8080/stock.json').then((res) => res.json())
  console.log(list)
  transactionHistoryList.value = list.reverse()
}
onMounted(() => {
  loadData()
})

enum StockTrackerTab {
  HISTORY = 'history',
  STATISTICS = 'statistics',
}

const tabOptions = ref([
  {label: '交易记录', value: StockTrackerTab.HISTORY},
  {label: '统计', value: StockTrackerTab.STATISTICS},
])
const curTab = ref(StockTrackerTab.HISTORY)
</script>

<template>
  <div class="stock-tracker vp-bg">
    <div class="action-row">
      <div class="flex-row-center-gap">
        <button class="vp-button primary">添加交易记录</button>
      </div>
      <RectSwitch v-model="curTab" :options="tabOptions" />
      <div class="flex-row-center-gap">
        <button class="vp-button">导入数据</button>
        <button class="vp-button">导出数据</button>
      </div>
    </div>

    <div class="content-wrapper">
      <TransactionHistory
        v-if="curTab === StockTrackerTab.HISTORY"
        :history-list="transactionHistoryList"
      />
      <StockStatistics
        v-if="curTab === StockTrackerTab.STATISTICS"
        :history-list="transactionHistoryList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stock-tracker {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;

  .action-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 4px;
    border-bottom: 1px solid $color_border;
  }

  .content-wrapper {
    flex: 1;
  }

  :deep(.price-up) {
    color: green;
  }
  :deep(.price-down) {
    color: red;
  }
}
</style>
