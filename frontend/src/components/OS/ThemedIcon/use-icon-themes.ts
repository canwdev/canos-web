import {createGlobalState} from '@vueuse/core'
import {isSrcHttpUrl} from '@/utils/is'
import {useSettingsStore} from '@/store/settings'

export interface IconOptions {
  label: string
  value: string
  fileExt: string
}

export const DEFAULT_ICON_THEME = 'material'
export const ICON_BASE_URL = './resources/icons'

const useIconThemeState = createGlobalState(() => {
  const isInitialized = ref(false)
  const iconOptions = ref<IconOptions[]>([])
  const iconMap = ref({})
  return {
    isInitialized,
    iconOptions,
    iconMap,
  }
})
export const useIconThemes = () => {
  const {iconOptions, iconMap, isInitialized} = useIconThemeState()

  const loadIconThemes = async () => {
    if (isInitialized.value) {
      return
    }
    const res = await fetch(`${ICON_BASE_URL}/index.json`)
    const {iconThemes} = await res.json()

    iconOptions.value = iconThemes
    const map = {}
    iconThemes.map((i) => {
      map[i.value] = i
    })
    iconMap.value = map

    isInitialized.value = true
  }

  return {
    iconOptions,
    iconMap,
    loadIconThemes,
  }
}

export const useThemedIcon = () => {
  const settingsStore = useSettingsStore()
  const {iconMap} = useIconThemes()
  const getIconPath = (filename: string, ext?: string, isFallback = false) => {
    if (isSrcHttpUrl(filename)) {
      return filename
    }

    const iconTheme = isFallback ? DEFAULT_ICON_THEME : settingsStore.iconTheme
    if (ext !== undefined) {
      filename = filename + ext
    } else {
      filename = filename + iconMap.value[iconTheme].fileExt
    }

    return `${ICON_BASE_URL}/${iconTheme}/${filename}`
  }
  return {
    getIconPath,
  }
}
