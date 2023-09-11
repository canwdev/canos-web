import {proxy} from 'valtio'

interface StoreType {
  count: number
  setCount: Function
  tasks: string[]
  handleCloseTask: Function
  activeIndex: number
}

export const counterStore = proxy<StoreType>({
  // state
  count: 0,
  // action
  setCount: (val: number) => {
    counterStore.count = val
  },
  tasks: [],
  handleCloseTask: (idx: number) => {
    const t = [...counterStore.tasks]
    t.splice(idx, 1)
    counterStore.tasks = t
    setTimeout(() => {
      counterStore.activeIndex = t.length - 1
    })
  },
  activeIndex: 0,
})
