import * as Path from 'path'
import * as crypto from 'crypto'

// Check if path is absolute
export function isAbsolutePath(path) {
  return /^(?:\/|[a-zA-Z]:\\)/.test(path)
}

export const getSafePath = (p) => {
  return Path.normalize(p).replace(/^(\.\.(\/|\\|$))+/, '')
}

export function calcBufferHash(buffer, algorithm = 'sha1') {
  return new Promise((resolve, reject) => {
    const sum = crypto.createHash(algorithm)
    try {
      sum.update(buffer)
      const hash = sum.digest('hex')
      return resolve(hash)
    } catch (error) {
      return reject(error)
    }
  })
}
