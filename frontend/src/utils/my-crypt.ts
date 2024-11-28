import * as CryptoJS from 'crypto-js'
import {isDev, LS_KEY_EASY_API_CRYPT_KEY} from '@/enum'
import {useStorage} from '@vueuse/core'

export class MyCrypt {
  private readonly getKey: () => string

  constructor(getKey?: () => string) {
    // Must be 256 bits (32 characters), you may consider validating this input in production
    this.getKey = getKey || (() => '')
  }

  encrypt(text: string, key = this.getKey()): string {
    if (!text) {
      return text
    }

    // Generate a random IV (16 bytes for AES)
    const iv = CryptoJS.lib.WordArray.random(128 / 8) // 128 bits = 16 bytes

    // Encrypt the text
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Hex.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC, // AES uses CBC mode by default
      padding: CryptoJS.pad.Pkcs7,
    })

    // Return IV and encrypted string as 'iv:encrypted'
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`
  }

  decrypt(text: string, key = this.getKey()): string {
    if (!text) {
      return text
    }

    const [iv, encryptedText] = text.split(':')

    // Decrypt the text
    const decrypted = CryptoJS.AES.decrypt(
      {ciphertext: CryptoJS.enc.Hex.parse(encryptedText)},
      CryptoJS.enc.Hex.parse(key),
      {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    )

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}

export const cryptKeyRef = useStorage(LS_KEY_EASY_API_CRYPT_KEY, '')

export const myApiEncrypt = new MyCrypt(() => cryptKeyRef.value)

/**
 * 加密请求
 * @param config axios service.interceptors.request.use 的配置
 */
export const feEncryptRequest = (config) => {
  if (config.skipEncrypt) {
    return
  }
  if (config.data && !(config.data instanceof FormData)) {
    if (isDev) {
      console.log('req [data]', config.data)
    }
    config.data = {
      main: myApiEncrypt.encrypt(JSON.stringify(config.data)),
    }
  }
  if (config.params) {
    if (isDev) {
      console.log('req [params]', config.params)
    }
    config.params = {
      main: myApiEncrypt.encrypt(JSON.stringify(config.params)),
    }
  }
}

/**
 * 解密请求
 */
export const feDecryptResponse = (response) => {
  try {
    const {data} = response
    if (data && data.main) {
      const decrypted = myApiEncrypt.decrypt(data.main) || 'null'
      const dd = JSON.parse(decrypted)
      if (isDev && dd) {
        console.log('res [data]', dd)
      }
      response.data = dd
    }
  } catch (error: any) {
    window.$message.error(
      `Decryption response error, please make sure you set the correct ck! Error: ${error.message}`,
    )
    throw error
  }
}
