import {bytesToSize, formatDate} from '@/utils'
import {getFileIconName} from '@/apps/FileManager/ExplorerUI/file-icons'
import {useSystemStore} from '@/store/system'
import {shortcutFilenameReg} from '@/utils/is'

export const useFileItem = (props) => {
  const systemStore = useSystemStore()

  const {item} = toRefs(props)

  const shortcutAppid = computed(() => {
    const filename = item.value.name || ''
    const isShortcutFile = shortcutFilenameReg.test(filename)

    if (!isShortcutFile) {
      return null
    }

    return filename.replace(shortcutFilenameReg, '')
  })

  const iconName = computed(() => {
    if (shortcutAppid.value) {
      return systemStore.allAppidMap[shortcutAppid.value].icon
    }
    return getFileIconName(item.value)
  })

  const iconClass = computed(() => {
    if (shortcutAppid.value) {
      return systemStore.allAppidMap[shortcutAppid.value].iconClass
    }
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

  const nameDisplay = computed(() => {
    if (shortcutAppid.value) {
      return systemStore.allAppidMap[shortcutAppid.value].title
    }
    return item.value.name
  })

  return {
    iconName,
    iconClass,
    titleDesc,
    extDisplay,
    nameDisplay,
    shortcutAppid,
  }
}
