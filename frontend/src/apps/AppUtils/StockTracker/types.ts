export enum EntrustSide {
  BUY = 'B',
  SALE = 'S',
}

export interface ITransactionHistory {
  // 股票代码
  symbol: string
  // 股票名称
  symbolName: string
  // 成交平均价格
  businessAvgPrice: number
  // 成交数量
  businessQty: number
  // 货币类型
  currency: string
  // 委托价格
  entrustPrice: number
  // 委托数量
  entrustQty: number
  // 委托方向
  entrustSide: EntrustSide
  // 备注
  remark: string
  // 创建时间
  createTimestamp: number
}
