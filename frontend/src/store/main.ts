type IStore = {
  isAppDarkMode: boolean
  isPreviewDesktop: boolean
  userInfo: any
}

export const useMainStore = defineStore('main', {
  state: (): IStore => {
    return {
      isAppDarkMode: true,
      isPreviewDesktop: false,
      userInfo: null,
    }
  },
  actions: {},
})
