import {showInputPrompt} from '@/components/CommonUI/input-prompt'
import moment from 'moment'

export const promptGetFileName = async (name?, fallbackPrefix = 'PageCraft') => {
  return await showInputPrompt({
    title: 'Export filename',
    value: name || `${fallbackPrefix}_${moment(new Date()).format('YYYYMMDD_HHmmss')}`,
  })
}
export const handleExportFile = (filename, contentStr, ext) => {
  if (!filename) {
    throw new Error('filename is required')
  }
  const blob = new Blob([contentStr], {
    type: 'text/plain;charset=utf-8',
  })
  FileSaver.saveAs(blob, filename + ext)
}
export const handleImportJson = async () => {
  const [handle] = await window.showOpenFilePicker({
    types: [
      {
        description: 'JSON',
        accept: {
          'application/JSON': ['.json'],
        },
      },
    ],
  })
  const file = await handle.getFile()
  const str = await handleReadSelectedFile(file)
  return JSON.parse(str as string)
}
export const handleReadSelectedFile = (file) => {
  // console.log(file)
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        resolve(reader.result)
      } catch (error: any) {
        reject(error)
        window.$message.error('Import Failed! ' + error.message)
      }
    }
    reader.readAsText(file)
  })
}
