<script setup lang="ts">
import AutoTableElPlus from '@/components/CanUI/packages/AutoTableElPlus/index.vue'
import {AutoTableColumn} from '@/components/CanUI/packages/AutoTableElPlus/types'
import {EntrustSide, ITransactionHistory} from '@/apps/AppUtils/StockTracker/types'
import {getPriceClassName, getPriceWithSymbol} from '@/apps/AppUtils/StockTracker/utils'
import {useResizeObserver} from '@vueuse/core'

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
  currency: string
}

const tableData = ref<IStatisticsTableItem[]>([])

const tableColumns: AutoTableColumn[] = [
  {key: 'symbol', label: '股票代码'},
  {key: 'symbolName', label: '股票名称'},
  {
    key: 'totalIncome',
    label: '历史收益',
    formatter({row}) {
      return `<span class="${getPriceClassName(row.totalIncome)}">${getPriceWithSymbol({
        price: row.totalIncome,
        currency: row.currency,
        showCurrencyCode: false,
      })}</span>`
    },
  },
  {
    key: 'curHold',
    label: '当前持有总价',
    formatter({row}) {
      return getPriceWithSymbol({
        price: row.curHold,
        currency: row.currency,
        showCurrencyCode: false,
      })
    },
  },
  {key: 'curQty', label: '当前持有数量'},
  {
    key: 'holdAvgPrice',
    label: '持有均价',
    formatter({row}) {
      return getPriceWithSymbol({
        price: row.holdAvgPrice,
        currency: row.currency,
        showCurrencyCode: false,
      })
    },
  },
]

const doCalculate = async () => {
  type IStockStatistics = {
    currency: string
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
      currency,
    } = stock

    if (statusName !== '全部成交') {
      // 已撤单
      return
    }

    if (!symbolMap[symbol]) {
      // 初始化数据
      symbolMap[symbol] = {
        currency,
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
      currency: item.currency,
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

const rootRef = ref()
const maxHeight = ref(300)
useResizeObserver(rootRef, (entries) => {
  const entry = entries[0]
  const {width, height} = entry.contentRect
  maxHeight.value = height
})

const totalIncome = computed(() => {
  return tableData.value.reduce((acc, cur) => {
    return acc + cur.totalIncome
  }, 0)
})

const totalHold = computed(() => {
  return tableData.value.reduce((acc, cur) => {
    return acc + cur.curHold
  }, 0)
})
</script>

<template>
  <div class="stock-statistics-wrapper">
    <div ref="rootRef" class="stock-statistics">
      <AutoTableElPlus :data="tableData" :columns="tableColumns" :max-height="maxHeight" />
    </div>
    <div class="st-row flex-row-center-gap">
      <span>
        历史 收益:
        <span :class="[getPriceClassName(totalIncome)]">
          {{
            getPriceWithSymbol({
              price: totalIncome,
              currency: tableData[0]?.currency,
            })
          }}
        </span>
      </span>
      <span>
        总持有:
        <span>
          {{
            getPriceWithSymbol({
              price: totalHold,
              currency: tableData[0]?.currency,
            })
          }}
        </span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stock-statistics-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;

  .st-row {
    padding: 4px 8px;
    gap: 15px;
  }

  .stock-statistics {
    flex: 1;
  }
}
</style>
