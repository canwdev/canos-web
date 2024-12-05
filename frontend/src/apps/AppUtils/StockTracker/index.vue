<script setup lang="ts">
import TabLayout from '@/components/CanUI/packages/Layouts/TabLayout.vue'
import StockStatistics from '@/apps/AppUtils/StockTracker/StockStatistics.vue'
import TransactionHistory from '@/apps/AppUtils/StockTracker/TransactionHistory.vue'
import {ITransactionHistory} from '@/apps/AppUtils/StockTracker/types'

const transactionHistoryList = ref<ITransactionHistory[]>([])
const loadData = async () => {
  let data = await fetch('http://127.0.0.1:8080/stock.json').then((res) => res.json())
  console.log(data)
  transactionHistoryList.value = data.reverse()
}
onMounted(() => {
  loadData()
})

enum StockTrackerTab {
  HISTORY = 'history',
  STATISTICS = 'statistics',
}

const settingsTabs = ref([
  {label: '交易记录', value: StockTrackerTab.HISTORY},
  {label: '统计', value: StockTrackerTab.STATISTICS},
])
const curTab = ref(StockTrackerTab.HISTORY)
</script>

<template>
  <div class="stock-tracker vp-bg">
    <div class="action-row flex-row-center-gap">
      <button class="vp-button" @click="loadData">Refresh</button>
    </div>

    <TabLayout v-model="curTab" :options="settingsTabs">
      <TransactionHistory
        v-if="curTab === StockTrackerTab.HISTORY"
        :history-list="transactionHistoryList"
      />
      <StockStatistics
        v-if="curTab === StockTrackerTab.STATISTICS"
        :history-list="transactionHistoryList"
      />
    </TabLayout>
  </div>
</template>

<style lang="scss" scoped>
.stock-tracker {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .mc-vertical-tab-layout {
    flex: 1;
  }
}
</style>
