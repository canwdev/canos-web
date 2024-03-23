export const supportedMusicFormat = /\.(mp3|wav|ogg|flac|opus)$/i
export const isSupportedMusicFormat = (name) => supportedMusicFormat.test(name)

/**
 * 是否外部链接
 * @param url
 * @returns {boolean}
 */
export function isOutLink(url) {
  return /^(https?:|mailto:|tel:|[a-zA-Z]{4,}:)/.test(url)
}

export function isBase64Image(str) {
  return /^data:image\/([a-zA-Z]*);base64,/.test(str)
}

export function isSrcHttpUrl(url) {
  return /^(https?:)/gi.test(url)
}

export function isUrlImage(url) {
  return /\.(?:jpg|jpeg|jfif|pjpeg|pjp|gif|apng|png|webp|svg|avif)$/gi.test(url)
}
