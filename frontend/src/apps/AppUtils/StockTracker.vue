<script setup lang="ts">
enum EntrustSide {
  BUY = '买入',
  SALE = '卖出',
}

const loadData = async () => {
  let data = await fetch('http://127.0.0.1:8080/stock.json').then((res) => res.json())
  console.log(data)
  // 按时间倒序
  data = data.reverse()

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

  data.forEach((stock) => {
    const {
      symbol,
      symbolName,
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
    if (EntrustSide.BUY === entrustSideName) {
      // 买入
      for (let i = 0; i < businessQty; i++) {
        buyList.push({
          price: businessAvgPrice,
          createDate,
          createTime,
        })
      }
    } else if (EntrustSide.SALE === entrustSideName) {
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
  console.table(symbolMap)
}
onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="stock-tracker vp-bg">stock-tracker</div>
</template>

<style lang="css" scoped>
.stock-tracker {
}
</style>
