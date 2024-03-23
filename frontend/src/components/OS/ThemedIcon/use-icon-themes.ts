import {createGlobalState} from '@vueuse/core'

export interface IconOptions {
  label: string
  value: string
  fileExt: string
}

export const DEFAULT_ICON_THEME = 'elementary-xfce'
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
