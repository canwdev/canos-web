import {createGlobalState} from '@vueuse/core'

export interface IOptions {
  label: string
  value: string
}

export const DEFAULT_THEME = 'theme-default'
const defaultThemeOptions = [
  {
    label: 'Default',
    value: DEFAULT_THEME,
  },
]

const addCssFile = (filename) => {
  const head = document.getElementsByTagName('head')[0]
  const links = document.getElementsByTagName('link')
  for (let i = 0; i < links.length; i++) {
    if (links[i].href === filename) {
      return // 如果已经存在相同的文件，则不添加
    }
  }
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = filename
  link.id = filename
  head.appendChild(link)
}

const removeCssFile = (filename) => {
  const links = document.getElementsByTagName('link')
  for (let i = 0; i < links.length; i++) {
    console.log(links[i].id, filename)
    if (links[i].id === filename) {
      links[i].remove()
      return
    }
  }
}

const useThemeState = createGlobalState(() => {
  const isInitialized = ref(false)
  const themeOptions = ref<IOptions[]>([...defaultThemeOptions])
  return {
    isInitialized,
    themeOptions,
  }
})
export const useThemeOptions = () => {
  const {themeOptions, isInitialized} = useThemeState()

  const themes = ref<IOptions[]>([])
  const addThemes = async () => {
    const res = await fetch('./themes-dist/index.json')
    themes.value = await res.json()

    themes.value.forEach((item) => {
      addCssFile(`./themes-dist/${item.value}.css`)
    })

    themeOptions.value = [...defaultThemeOptions, ...themes.value]
  }

  const removeThemes = () => {
    themes.value.forEach((item) => {
      removeCssFile(`./themes-dist/${item.value}.css`)
    })
  }

  onMounted(async () => {
    if (isInitialized.value) {
      return
    }
    await addThemes()
    isInitialized.value = true
  })

  return {
    themeOptions,
    addThemes,
    removeThemes,
  }
}
