import moment from 'moment/moment'

export function snapVideoImageDownload(video) {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

  // 将 canvas 转换为 png 格式并保存
  const dataUrl = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = `screenshot_${moment().format('YYYY-MM-DD_HH-mm-ss')}.png`
  link.href = dataUrl
  link.click()
}
