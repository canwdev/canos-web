;(function () {
  /**
   * Encodes a string to Base64 with UTF-8 character encoding.
   * @param str The input string to encode.
   */
  const btoa_utf8 = (str) => {
    // 将字符串编码为UTF-8字节数组
    const textEncoder = new TextEncoder()
    const utf8Bytes = textEncoder.encode(str)

    return btoa(String.fromCharCode(...utf8Bytes))
  }

  /**
   * Decodes a Base64-encoded string with UTF-8 character encoding.
   * @param encodedStr The Base64-encoded string to decode.
   */
  const atob_utf8 = (encodedStr) => {
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

  function blobToBase64(blob) {
    console.log('b', blob)
    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = (e) => {
        resolve(e.target.result)
      }
      fr.onerror = reject
      fr.readAsDataURL(blob)
    })
  }

  const {copy, useFileDialog, addPlugin} = window.$qlUtils

  addPlugin((valRef) => {
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
                const list = []
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
  })
})()
