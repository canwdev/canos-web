/**
 * https://github.com/brix/crypto-js/issues/195
 */
import * as crypto from 'crypto-js'

const IV_LENGTH = 16 // For AES, this is always 16

export class MyCrypt {
  private readonly encryptionKey: string
  constructor(key: string) {
    // Must be 256 bits (32 characters)
    this.encryptionKey = key
  }

  encrypt(text: string) {
    const iv = crypto.lib.WordArray.random(IV_LENGTH)
    const encrypted = crypto.AES.encrypt(text, crypto.enc.Utf8.parse(this.encryptionKey), {
      keySize: 256,
      iv,
      mode: crypto.mode.CBC,
    })
    const cipherString = crypto.enc.Base64.stringify(encrypted.ciphertext)
    return `${iv.toString(crypto.enc.Hex)}:${cipherString}`
  }

  decrypt(text: string) {
    const [ivHex, cipher] = text.split(':')
    const decrypted = crypto.AES.decrypt(cipher, crypto.enc.Utf8.parse(this.encryptionKey), {
      keySize: 256,
      iv: crypto.enc.Hex.parse(ivHex),
      mode: crypto.mode.CBC,
    })
    return decrypted.toString(crypto.enc.Utf8)
  }
}
