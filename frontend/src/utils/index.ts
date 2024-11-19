import moment from 'moment/moment'

export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

/**
 * 复制字符串到剪贴板操作（兼容新旧接口）
 * @param text 要复制的文本
 */
export const copyToClipboard = (text): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 如果支持 Clipboard API，就使用它
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      // 使用 document.execCommand 兼容旧 API
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.display = 'none'
      document.body.appendChild(textarea)
      textarea.select()

      try {
        const success = document.execCommand('copy')
        if (!success) {
          throw new Error('Unable to perform copy operation')
        } else {
          resolve()
        }
      } catch (error) {
        reject(error)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  })
}

export const copyWithToast = async (val, isShowVal = false) => {
  if (!val) {
    return
  }
  if (typeof val === 'object') {
    console.info('object', val)
    val = JSON.stringify(val, null, 2)
  }
  console.info('copy:', val)
  await copyToClipboard(val)
  let showVal = ''
  if (isShowVal) {
    if (val.length > 50) {
      showVal = val.slice(0, 50) + '...'
    } else {
      showVal = val
    }
  }
  if (showVal) {
    showVal = ': ' + showVal
  }
  window.$message.success(`Copied${showVal}`)
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

export function formatDate(d: any | number, format = 'YYYY-MM-DD HH:mm') {
  if (!d) {
    return ''
  }
  return moment(d).format(format)
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

// 字节转换为可读的单位
export const bytesToSize = (bytes, autoNo = '0 B') => {
  bytes = Number(bytes)
  if (Number.isNaN(bytes)) {
    return '-'
  }
  if (bytes === 0) return autoNo
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number(bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sleep = (t) => {
  return new Promise((resolve) => setTimeout(resolve, t))
}

// 文件对象转换为base64
export function blobToBase64(blob): Promise<string> {
  console.log('b', blob)
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      resolve(e.target!.result as string)
    }
    fr.onerror = reject
    fr.readAsDataURL(blob)
  })
}
