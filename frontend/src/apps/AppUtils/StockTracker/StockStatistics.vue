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

interface IStatisticsTableItem {
  symbol: string
  symbolName: string
  totalIncome: number
  curHold: number
  curQty: number
  holdAvgPrice: number
}
const tableData = ref<IStatisticsTableItem[]>([])

const tableColumns: AutoTableColumn[] = [
  {key: 'symbol', label: '股票代码'},
  {key: 'symbolName', label: '股票名称'},
  {key: 'totalIncome', label: '总收益'},
  {key: 'curHold', label: '当前持有总价'},
  {key: 'curQty', label: '当前持有数量'},
  {key: 'holdAvgPrice', label: '持有均价'},
]

const doCalculate = async () => {
  type IStockStatistics = {
    symbolName: string
    // 总收益
    totalIncome: number
    // 买入队列(FIFO)，每个item的 quantity 始终为1
    buyList: Array<{
      price: number
      createDate: string
      createTime: string
    }>
  }
  const symbolMap: {[key: string]: IStockStatistics} = {}

  historyList.value.forEach((stock) => {
    const {
      symbol,
      symbolName,
      entrustSide,
      entrustSideName,
      // entrustPrice: businessAvgPrice,
      businessAvgPrice,
      businessQty,
      statusName,
      createDate,
      createTime,
    } = stock

    if (statusName !== '全部成交') {
      // 已撤单
      return
    }

    if (!symbolMap[symbol]) {
      // 初始化数据
      symbolMap[symbol] = {
        symbolName,
        totalIncome: 0,
        buyList: [],
      }
    }

    let {totalIncome, buyList} = symbolMap[symbol]

    console.log(symbolName, symbol, entrustSideName, businessQty, businessAvgPrice)
    if (EntrustSide.BUY === entrustSide) {
      // 买入
      for (let i = 0; i < businessQty; i++) {
        buyList.push({
          price: businessAvgPrice,
          createDate,
          createTime,
        })
      }
    } else if (EntrustSide.SALE === entrustSide) {
      // 卖出: 按照先进先出（FIFO）的方法计算每次卖出操作的利润
      let currentEarn = 0
      for (let i = 0; i < businessQty; i++) {
        // 获取收益并累加
        const firstBuyPrice = buyList[0].price
        currentEarn = currentEarn + (businessAvgPrice - firstBuyPrice)
        console.warn(`calc: ${symbol}`, {currentEarn, businessAvgPrice, firstBuyPrice})
        // 删除之前的买入（出）
        buyList.shift()
      }

      currentEarn = parseFloat(currentEarn.toFixed(2))
      totalIncome += currentEarn
    }
    totalIncome = parseFloat(totalIncome.toFixed(2))

    // 更新数据对象
    symbolMap[symbol].totalIncome = totalIncome

    console.log(symbol, symbolMap[symbol])
  })

  console.log('--- result ---')
  const resultTable = Object.keys(symbolMap).map((key) => {
    const item = symbolMap[key]
    const curHold = item.buyList.reduce((acc, cur) => {
      return acc + cur.price
    }, 0)
    const curQty = item.buyList.length
    return {
      symbol: key,
      symbolName: item.symbolName,
      totalIncome: item.totalIncome,
      curHold,
      curQty,
      holdAvgPrice: parseFloat((curHold / curQty).toFixed(2)),
    }
  })
  console.table(resultTable)
  tableData.value = resultTable
}
watch(historyList, () => {
  doCalculate()
})
onMounted(() => {
  doCalculate()
})
</script>

<template>
  <div class="stock-statistics">
    <AutoTableElPlus :data="tableData" :columns="tableColumns" />
  </div>
</template>

<style lang="scss" scoped>
.stock-statistics {
}
</style>
