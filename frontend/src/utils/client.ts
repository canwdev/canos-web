const {electronAPI} = window

export const isClient = Boolean(electronAPI)

export const getClientHostUrl = (fallbackUrl = '') => {
  if (isClient) {
    const port = electronAPI.getClientHostPort()
    return `http://127.0.0.1:${port}`
  }
  return import.meta.env.VITE_API_HOST || fallbackUrl
}

export const openInBrowser = (url) => {
  if (isClient) {
    electronAPI.openExternal(url)
  } else {
    window.open(url, '_blank')
  }
}
