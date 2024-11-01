import {bytesToSize, formatDate} from '@/utils'
import {getFileIconName} from '@/apps/FileManager/ExplorerUI/file-icons'

export const useFileItem = (props) => {
  const {item} = toRefs(props)
  const iconName = computed(() => {
    return getFileIconName(item.value)
  })
  const titleDesc = computed(() => {
    return `Name: ${item.value.name}
Size: ${bytesToSize(item.value.size)}
Type: ${item.value.mimeType || '-'}
Last Modified: ${formatDate(item.value.lastModified, 'YYYY-MM-DD HH:mm:ss')}
Created: ${formatDate(item.value.birthtime, 'YYYY-MM-DD HH:mm:ss')}
`
  })
  const extDisplay = computed(() => {
    return (item.value.ext || '').replace(/^\./, '')
  })

  return {
    iconName,
    titleDesc,
    extDisplay,
  }
}
