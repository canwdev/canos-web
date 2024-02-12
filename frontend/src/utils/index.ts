import moment from 'moment/moment'

export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export const copyToClipboard = (text: string) => {
  const input = document.createElement('textarea')
  input.value = text
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
}

export const isCharacterKeyPress = (evt) => {
  if (typeof evt.which == 'undefined') {
    // This is IE, which only fires keypress events for printable keys
    return true
  } else if (typeof evt.which == 'number' && evt.which > 0) {
    // In other browsers except old versions of WebKit, evt.which is
    // only greater than zero if the keypress is a printable key.
    // We need to filter out backspace and ctrl/alt/meta key combinations
    return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8
  }
  return false
}

export function pad2Num(num: number, len = 2) {
  return num.toString().padStart(len, '0')
}

export function formatDate(d: Date) {
  if (!d) {
    return ''
  }
  return moment(d).format('YYYY-MM-DD HH:mm:ss')
}

export const formatTimeHMS = (ms) => {
  const h = Math.round(ms / (60 * 60))
    .toString()
    .padStart(2, '0') //精确小时，用去余
  const m = Math.round((ms / 60) % 60)
    .toString()
    .padStart(2, '0') //剩余分钟就是用1小时等于60分钟进行趣余
  const s = Math.round(ms % 60)
    .toString()
    .padStart(2, '0')
  return h + ':' + m + ':' + s
}

export const formatSelectOptions = (list: string[]) => {
  return list.map((item) => {
    return {
      value: item,
      label: item,
    }
  })
}

// 文件大小转换
export const bytesToSize = (bytes, autoNo = '0B') => {
  bytes = Number(bytes)
  if (bytes === 0) return autoNo
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number(bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
  //toPrecision(3) 后面保留一位小数，如1.0GB
}

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sleep = (t) => {
  return new Promise((resolve) => setTimeout(resolve, t))
}
