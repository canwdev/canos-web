/* eslint-disable */
/*!
 * currency.js - v2.0.4
 * http://scurker.github.io/currency.js
 *
 * Copyright (c) 2021 Jason Wilson
 * Released under MIT license
 */

'use strict'

var defaults = {
  symbol: '$',
  separator: ',',
  decimal: '.',
  errorOnInvalid: false,
  precision: 2,
  pattern: '!#',
  negativePattern: '-!#',
  format: format,
  fromCents: false,
}

var round = function round(v) {
  return Math.round(v)
}

var pow = function pow(p) {
  return Math.pow(10, p)
}

var rounding = function rounding(value, increment) {
  return round(value / increment) * increment
}

var groupRegex = /(\d)(?=(\d{3})+\b)/g
var vedicRegex = /(\d)(?=(\d\d)+\d\b)/g
/**
 * Create a new instance of currency.js
 * @param {number|string|currencyJs} value
 * @param {object} [opts]
 */

function currencyJs(value, opts) {
  var that = this

  if (!(that instanceof currencyJs)) {
    return new currencyJs(value, opts)
  }

  var settings = Object.assign({}, defaults, opts)
  var precision = pow(settings.precision)
  var v = parse(value, settings)
  that.intValue = v
  that.value = v / precision // Set default incremental value

  settings.increment = settings.increment || 1 / precision // Support vedic numbering systems
  // see: https://en.wikipedia.org/wiki/Indian_numbering_system

  if (settings.useVedic) {
    settings.groups = vedicRegex
  } else {
    settings.groups = groupRegex
  } // Intended for internal usage only - subject to change

  this.s = settings
  this.p = precision
}

function parse(value, opts) {
  var useRounding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true
  var v = 0
  var decimal = opts.decimal
  var errorOnInvalid = opts.errorOnInvalid
  var decimals = opts.precision
  var fromCents = opts.fromCents
  var precision = pow(decimals)
  var isNumber = typeof value === 'number'
  var isCurrency = value instanceof currencyJs

  if (isCurrency && fromCents) {
    return value.intValue
  }

  if (isNumber || isCurrency) {
    v = isCurrency ? value.value : value
  } else if (typeof value === 'string') {
    var regex = new RegExp('[^-\\d' + decimal + ']', 'g')
    var decimalString = new RegExp('\\' + decimal, 'g')
    v = value
      .replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
      .replace(regex, '') // replace any non numeric values
      .replace(decimalString, '.') // convert any decimal values

    v = v || 0
  } else {
    if (errorOnInvalid) {
      throw Error('Invalid Input')
    }

    v = 0
  }

  if (!fromCents) {
    v *= precision // scale number to integer value

    v = v.toFixed(4) // Handle additional decimal for proper rounding.
  }

  return useRounding ? round(v) : v
}
/**
 * Formats a currency object
 * @param currency
 * @param {object} [opts]
 */

function format(currency, settings) {
  var pattern = settings.pattern
  var negativePattern = settings.negativePattern
  var symbol = settings.symbol
  var separator = settings.separator
  var decimal = settings.decimal
  var groups = settings.groups
  var split = ('' + currency).replace(/^-/, '').split('.')
  var dollars = split[0]
  var cents = split[1]
  return (currency.value >= 0 ? pattern : negativePattern)
    .replace('!', symbol)
    .replace('#', dollars.replace(groups, '$1' + separator) + (cents ? decimal + cents : ''))
}

currencyJs.prototype = {
  /**
   * Adds values together.
   * @param {number} number
   * @returns {currencyJs}
   */
  add: function add(number) {
    var intValue = this.intValue
    var _settings = this.s
    var _precision = this.p
    return currencyJs(
      (intValue += parse(number, _settings)) / (_settings.fromCents ? 1 : _precision),
      _settings
    )
  },

  /**
   * Subtracts value.
   * @param {number} number
   * @returns {currencyJs}
   */
  subtract: function subtract(number) {
    var intValue = this.intValue
    var _settings = this.s
    var _precision = this.p
    return currencyJs(
      (intValue -= parse(number, _settings)) / (_settings.fromCents ? 1 : _precision),
      _settings
    )
  },

  /**
   * Multiplies values.
   * @param {number} number
   * @returns {currencyJs}
   */
  multiply: function multiply(number) {
    var intValue = this.intValue
    var _settings = this.s
    return currencyJs(
      (intValue *= number) / (_settings.fromCents ? 1 : pow(_settings.precision)),
      _settings
    )
  },

  /**
   * Divides value.
   * @param {number} number
   * @returns {currencyJs}
   */
  divide: function divide(number) {
    var intValue = this.intValue
    var _settings = this.s
    return currencyJs((intValue /= parse(number, _settings, false)), _settings)
  },

  /**
   * Takes the currency amount and distributes the values evenly. Any extra pennies
   * left over from the distribution will be stacked onto the first set of entries.
   * @param {number} count
   * @returns {array}
   */
  distribute: function distribute(count) {
    var intValue = this.intValue
    var _precision = this.p
    var _settings = this.s
    var distribution = []
    var split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count)
    var pennies = Math.abs(intValue - split * count)
    var precision = _settings.fromCents ? 1 : _precision

    for (; count !== 0; count--) {
      var item = currencyJs(split / precision, _settings) // Add any left over pennies

      pennies-- > 0 && (item = item[intValue >= 0 ? 'add' : 'subtract'](1 / precision))
      distribution.push(item)
    }

    return distribution
  },

  /**
   * Returns the dollar value.
   * @returns {number}
   */
  dollars: function dollars() {
    return ~~this.value
  },

  /**
   * Returns the cent value.
   * @returns {number}
   */
  cents: function cents() {
    var intValue = this.intValue
    var _precision = this.p
    return ~~(intValue % _precision)
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @param {boolean} useSymbol - format with currency symbol
   * @returns {string}
   */
  format: function format(options) {
    var _settings = this.s

    if (typeof options === 'function') {
      return options(this, _settings)
    }

    return _settings.format(this, Object.assign({}, _settings, options))
  },

  /**
   * Formats the value as a string according to the formatting settings.
   * @returns {string}
   */
  toString: function toString() {
    var intValue = this.intValue
    var _precision = this.p
    var _settings = this.s
    return rounding(intValue / _precision, _settings.increment).toFixed(_settings.precision)
  },

  /**
   * Value for JSON serialization.
   * @returns {float}
   */
  toJSON: function toJSON() {
    return this.value
  },
}

export default currencyJs