import currencyJs from './currency-js'
import {getSymbolFromCurrency} from './currency-symbol.js'

/**
 * 格式化字符串，示例：USD $98.99
 * 另见：PriceDisplayV2
 * @param config
 */
export const getPriceWithSymbol = (config) => {
  const {price = 0, currency, showCurrencyCode = true, precision = 2} = config || {}

  if (Number.isNaN(price)) {
    return '--'
  }

  // 货币前缀
  const codePrefix = showCurrencyCode && currency ? `${currency} ` : ``

  if (!currency) {
    return codePrefix + currencyJs(price, {precision})
  }

  let _precision = precision
  if (currency === 'JPY' || currency === 'KRW') {
    _precision = 0
  }

  const currencySymbol = getSymbolFromCurrency(currency)
  return (
    codePrefix +
    currencyJs(price, {
      symbol: currencySymbol,
      precision: _precision,
    }).format()
  )
}

export const getPriceClassName = (price: number) => {
  if (price > 0) {
    return 'price-up'
  }
  if (price < 0) {
    return 'price-down'
  }
  return ''
}
