export enum EntrustSide {
  BUY = 'B',
  SALE = 'S',
}

export interface ITransactionHistory {
  // 附加标志
  additionalFlag: number
  // 今日委托额外列表
  additionalTodayEntrustList: any[]
  // 成交平均价格
  businessAvgPrice: number
  // 成交数量
  businessQty: number
  // 创建日期
  createDate: string
  // 创建时间
  createTime: string
  // 货币类型
  currency: string
  // 委托金额
  entrustAmount: number
  // 委托价格
  entrustPrice: number
  // 委托属性
  entrustProp: string
  // 委托属性名称
  entrustPropName: string
  // 委托数量
  entrustQty: number
  // 委托方向
  entrustSide: EntrustSide
  // 委托方向名称
  entrustSideName: string
  // 交易所代码
  exchangeCode: string
  // 交易所名称
  exchangeName: string
  // 场外交易标志
  fillOutSideRTH: string
  // 最终状态标志
  finalStateFlag: string
  // 是否隐藏
  hidden: boolean
  // 唯一标识
  id: string
  // 市场
  market: string
  // 零股交易类型
  oddTradeType: number
  // 备注
  remark: string
  // 状态码
  status: number
  // 状态名称
  statusName: string
  // 股票订单类型
  stockOrderType: string
  // 股票代码
  symbol: string
  // 股票名称
  symbolName: string
  // 股票类型
  symbolType: string
  // 交易周期
  tradePeriod: string
}
