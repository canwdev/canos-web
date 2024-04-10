export enum TextConvertMode {
  DISABLED = 'disabled',
  NUMBER = 'number',
  TEXT = 'text',
  HTML = 'html',
  JSON = 'json',
}

export const TextConvertOptions = [
  {label: 'Text', value: TextConvertMode.TEXT},
  {label: 'HTML', value: TextConvertMode.HTML},
  {label: 'JSON', value: TextConvertMode.JSON},
]

export const textConvertMultipleLine = (
  str: string,
  mode: TextConvertMode = TextConvertMode.TEXT,
  options: any = {}
) => {
  if (mode === TextConvertMode.DISABLED) {
    return str
  }
  const {isTrimEmptyLines = false, isTrimQuotes = false, htmlTagName = '', htmlAttrs = ''} = options
  str = str.trim().replace(/ /gi, ' ') // replace [NBSP]

  if (isTrimEmptyLines) {
    str = str.replace(/^\s*[\r\n]/gm, '')
  }
  if (isTrimQuotes) {
    // 首尾字符必须相同
    if (str.charAt(0) === str.charAt(str.length - 1)) {
      // 移除首尾引号 ` | ' | "
      str = str.replace(/^['"`]+|['"`]+$/g, '')
    }
  }
  if (mode === TextConvertMode.TEXT) {
    return str
  }
  let arr = str.split('\n')
  arr = arr.map((i) => i.trim())
  if (mode === TextConvertMode.JSON) {
    if (arr.length === 1) {
      return JSON.stringify(arr[0])
    }
    return JSON.stringify(arr, null, 2)
  }
  if (mode === TextConvertMode.HTML) {
    if (htmlTagName) {
      return arr
        .map((item) => {
          return `<${htmlTagName}${htmlAttrs ? ` ${htmlAttrs}` : ''}>${item}</${htmlTagName}>`
        })
        .join('\n')
    }
    return arr.join('<br>')
  }
  return ''
}

export const textConvertAdvanced = (
  val: any,
  mode: TextConvertMode = TextConvertMode.TEXT,
  options: any = {}
) => {
  if (mode === TextConvertMode.NUMBER) {
    let num = Number(val)

    if (Number.isNaN(num)) {
      window.$message.error(`Invalid number: ${val}, converted to 0`)
      num = Number(0)
    }
    console.log(num)
    return num
  }
  val = textConvertMultipleLine(val, mode, options)
  if (mode === TextConvertMode.JSON) {
    val = JSON.parse(val)
  }
  return val
}
