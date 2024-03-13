import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import moment from 'moment/moment'
import {EyeDropper, useFileDialog} from '@vueuse/core'
import {Ref} from 'vue'
import {copy} from './utils'
import DynamicValueDisplay from './DynamicValueDisplay.vue'

const isTimestamp = (val) => {
  val = Number(val)
  const d = new Date(val)
  if (d.getTime() > 0) {
    return d
  }
  return false
}

export const qLogicDateTime = (val: string): QuickOptionItem | undefined => {
  const date = isTimestamp(val)
  if (date) {
    const label = moment(date).format('YYYY-MM-DD HH:mm:ss')
    return {
      label: '📋 ' + label,
      props: {onClick: () => copy(label)},
    }
  }
}

const evalCode = (val: string, isToast = false) => {
  try {
    return eval(val)
  } catch (error: any) {
    console.log(error)
    if (isToast) {
      window.$message.error(error.message)
    } else {
      return error.message
    }
  }
}

export const qLogicEval = (val: string): QuickOptionItem => {
  return {
    label: '⚡ JavaScript Eval',
    props: {
      onClick: async () => {
        await copy(evalCode(val, true), true)
      },
    },
  }
}

export const qLogicEval2 = (valRef: Ref<string>): QuickOptionItem => {
  return {
    label: '⚡ Realtime Eval',
    children: [
      {
        label: '',
        props: {
          onClick: async () => {
            await copy(evalCode(valRef.value, true), true)
          },
        },
        render: h(DynamicValueDisplay, {
          class: 'font-code',
          label: 'eval()',
          text: valRef,
          formatFn: (val) => {
            return evalCode(val)
          },
        }),
      },
    ],
  }
}

/**
 * Encodes a string to Base64 with UTF-8 character encoding.
 * @param str The input string to encode.
 */
export const btoa_utf8 = (str: string) => {
  // 将字符串编码为UTF-8字节数组
  const textEncoder = new TextEncoder()
  const utf8Bytes = textEncoder.encode(str)

  return btoa(String.fromCharCode(...utf8Bytes))
}

/**
 * Decodes a Base64-encoded string with UTF-8 character encoding.
 * @param encodedStr The Base64-encoded string to decode.
 */
export const atob_utf8 = (encodedStr: string) => {
  try {
    // 使用atob函数将Base64编码的字符串解码为字节数组
    const decodedBytes = new Uint8Array(
      atob(encodedStr)
        .split('')
        .map((char) => char.charCodeAt(0))
    )

    // 将字节数组转换回字符串
    const textDecoder = new TextDecoder('utf-8')
    return textDecoder.decode(decodedBytes)
  } catch (e) {
    console.warn(`检测到非base64编码文本，返回原文 ${encodedStr}`, e)
    return encodedStr
  }
}

function blobToBase64(blob: Blob) {
  console.log('b', blob)
  return new Promise<string>((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = (e) => {
      resolve(e.target!.result as string)
    }
    fr.onerror = reject
    fr.readAsDataURL(blob)
  })
}
export const qLogicBase64 = (valRef: Ref<string>): QuickOptionItem => {
  return {
    label: '🔤 Base64 Toolbox',
    children: [
      {
        label: 'text to base64',
        props: {
          onClick: () => {
            const str = btoa_utf8(valRef.value)
            copy(str, true)
          },
        },
      },
      {
        label: 'base64 to text',
        props: {
          onClick: () => {
            const str = atob_utf8(valRef.value)
            copy(str, true)
          },
        },
      },
      {
        label: 'browse files to base64...',
        props: {
          onClick: async () => {
            const {files, open, reset, onChange} = useFileDialog({})
            open()
            onChange(async (files) => {
              if (!files) {
                return
              }
              if (files.length === 1) {
                await copy(await blobToBase64(files[0]))
                return
              }
              const list: string[] = []
              for (let i = 0; i < files.length; i++) {
                const file = files[i]
                list.push(await blobToBase64(file))
              }
              await copy(list)
            })
          },
        },
      },
    ],
  }
}

export const qLogicEyeDrop: QuickOptionItem = {
  label: '💧 Eye Drop',
  search: 'eyedrop',
  props: {
    onClick: async () => {
      if ('EyeDropper' in window) {
        const eyeDropper: EyeDropper = new (window as any).EyeDropper()
        const result = await eyeDropper.open({})
        const {sRGBHex} = result
        await copy(sRGBHex, true)
      } else {
        window.$message.error(`window.EyeDropper is not supported`)
      }
    },
  },
}
