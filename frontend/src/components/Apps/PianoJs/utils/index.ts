import axios from 'axios'

const api = axios.create({
  // adapter: cache.adapter,
})

export function getAudioBuffer(audioContext, url) {
  return new Promise((resolve, reject) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        audioContext.decodeAudioData(res.data, (buffer) => {
          buffer ? resolve(buffer) : reject()
        })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
