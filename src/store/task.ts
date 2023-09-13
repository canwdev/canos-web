import {proxy} from 'valtio'
import {TaskItem} from '../enum'

interface StoreType {
  tasks: TaskItem[]
  handleCloseTask: Function
  activeIndex: number
}

export const taskStore = proxy<StoreType>({
  tasks: [],
  handleCloseTask: (idx: number) => {
    const t = [...taskStore.tasks]
    t.splice(idx, 1)
    taskStore.tasks = t
    setTimeout(() => {
      taskStore.activeIndex = t.length - 1
    })
  },
  activeIndex: 0,
})
