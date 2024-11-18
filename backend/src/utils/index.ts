import {serverInfo} from '@/enum'
import * as os from 'os'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const guid = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export const printServerRunningOn = (host, port, params = '') => {
  const ifaces = os.networkInterfaces()
  const protocol = 'http://'
  const localhostUrl = protocol + '127.0.0.1' + ':' + port

  console.log(`Server running on: ${localhostUrl}${params}`)
  if (host === '0.0.0.0') {
    const urls = []
    Object.keys(ifaces).forEach((dev) => {
      ifaces[dev].forEach((details) => {
        if (details.family === 'IPv4') {
          const url = protocol + details.address + ':' + port + params
          urls.push(url)
          serverInfo.hostUrls.push(url)
        }
      })
    })
    console.log(`Available on:`)
    console.log(urls.join('\n'))
  }

  return {
    localhostUrl,
  }
}
