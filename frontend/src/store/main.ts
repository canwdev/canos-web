type IStore = {
  isAppDarkMode: boolean
  isPreviewDesktop: boolean
  isShowStart: boolean
  userInfo: any
}

export const useMainStore = defineStore('main', {
  state: (): IStore => {
    return {
      isAppDarkMode: true,
      isPreviewDesktop: false,
      isShowStart: false,
      userInfo: null,
    }
  },
  actions: {},
})
