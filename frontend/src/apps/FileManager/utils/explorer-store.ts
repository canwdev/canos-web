type IStore = {
  cutPaths: string[]
  copyPaths: string[]
}

export const useExplorerStore = defineStore('explorer', {
  state: (): IStore => {
    return {
      cutPaths: [],
      copyPaths: [],
    }
  },
})
