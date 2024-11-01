import {IEntry} from '@server/types/server'
import {
  regArchiveFormat,
  regAudioFormat,
  regExeFormat,
  regImageFormat,
  regSupportedTextFormat,
  regVideoFormat,
} from '@/utils/is'

export const getFileIconName = (item?: IEntry) => {
  if (!item) {
    return 'dialog-error'
  }
  const {isDirectory, ext} = item
  if (isDirectory) {
    return 'folder'
  }
  if (regArchiveFormat.test(ext)) {
    return `archive`
  }
  if (regImageFormat.test(ext)) {
    return `image`
  }
  if (regAudioFormat.test(ext)) {
    return `audio`
  }
  if (regVideoFormat.test(ext)) {
    return `video`
  }
  if (regExeFormat.test(ext)) {
    return `exe`
  }
  if (regSupportedTextFormat.test(ext)) {
    if (/.(vue)$/.test(ext)) {
      return `vue`
    }
    if (/.(json)$/.test(ext)) {
      return `json`
    }
    if (/.(html|htm|hta)$/.test(ext)) {
      return `html`
    }
    if (/.(css|scss|sass|styl|less)$/.test(ext)) {
      return `css`
    }
    if (/.(js|jsx)$/.test(ext)) {
      return `javascript`
    }
    if (/.(ts|tsx)$/.test(ext)) {
      return `typescript`
    }
    if (/.(md)$/.test(ext)) {
      return `markdown`
    }
    return `text`
  }
  return 'file'
}
