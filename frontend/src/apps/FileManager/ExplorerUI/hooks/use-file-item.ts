import {bytesToSize, formatDate} from '@/utils'

export const useFileItem = (props) => {
  const {item} = toRefs(props)
  const iconName = computed(() => {
    if (item.value.isDirectory) {
      return 'folder'
    }
    return 'text-x-preview'
  })
  const titleDesc = computed(() => {
    return `Name: ${item.value.name}
Size: ${bytesToSize(item.value.size)}
Type: ${item.value.mimeType || '-'}
Last Modified: ${formatDate(item.value.lastModified, 'YYYY-MM-DD HH:mm:ss')}
Created: ${formatDate(item.value.birthtime, 'YYYY-MM-DD HH:mm:ss')}
`
  })

  return {
    iconName,
    titleDesc,
  }
}
