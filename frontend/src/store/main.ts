type IStore = {
  isAppDarkMode: boolean
}

export const useMainStore = defineStore('main', {
  state: (): IStore => {
    return {
      isAppDarkMode: true,
    }
  },
  actions: {},
})
