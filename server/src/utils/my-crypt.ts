import * as CryptoJS from 'crypto-js'
import {secretsStore} from '@/enum'

export class MyCrypt {
  private readonly secretKey: string

  constructor(key: string) {
    // Must be 256 bits (32 characters), you may consider validating this input in production
    this.secretKey = key
  }

  encrypt(text: string, key = this.secretKey): string {
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

  decrypt(text: string, key = this.secretKey): string {
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

export const myApiEncrypt = new MyCrypt(secretsStore.getData().EASY_API_CRYPT_KEY)
