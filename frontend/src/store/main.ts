type IStore = {
  isAppDarkMode: boolean
  userInfo: any
}

export const useMainStore = defineStore('main', {
  state: (): IStore => {
    return {
      isAppDarkMode: true,
      userInfo: null,
    }
  },
  actions: {},
})
