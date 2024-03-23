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
Last Modified: ${formatDate(item.value.lastModified)}
`
  })

  return {
    iconName,
    titleDesc,
  }
}
