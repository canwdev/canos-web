import {copyToClipboard} from '@/utils'

export const copy = async (val, showVal = false) => {
  if (typeof val === 'object') {
    console.info('object', val)
    val = JSON.stringify(val, null, 2)
  }
  console.info('copy:', val)
  await copyToClipboard(val)
  window.$message.success(`Copied${showVal ? `: ${val}` : ''}`)
}
