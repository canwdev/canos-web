export const regArchiveFormat =
  /\.(zip|rar|tar|gz|bz2|7z|xz|tgz|zipx|tar\.gz|tar\.bz2|xz|z|zip|lzh|arj|zoo|pkg|lz|7zip|cab|iso|dmg|apk)$/i
export const regImageFormat = /\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff?|heif|indd)$/i
export const regExeFormat = /\.(exe|cmd|bat|msi)$/i
export const regVideoFormat = /\.(mp4|mkv|avi|mov|wmv|flv|webm|m4v|mpeg|mpg|3gp|dat)$/i
export const regAudioFormat = /\.(mp3|wav|aac|flac|ogg|m4a|wma|opus|aiff?|dsd)$/i

export const regSupportedTextFormat =
  /\.(txt|csv|md|log|lock|ini|conf|config|json|js|jsx|ts|tsx|py|java|cpp|h|cs|rb|go|php|html|htm|hta|xml|yaml|css|scss|sass|styl|less|vue)$/i
export const regSupportedImageFormat = /\.(jpg|jpeg|png|gif|webp|svg)$/i
export const regSupportedVideoFormat = /\.(mp4|webm|mov)$/i
export const regSupportedAudioFormat = /\.(mp3|wav|ogg|flac|opus)$/i
export const isSupportedMediaFormat = (name) =>
  regSupportedAudioFormat.test(name) || regSupportedVideoFormat.test(name)

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
