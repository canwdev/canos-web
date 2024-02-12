import {ShortcutItem, TaskItem} from '@/enum/os'
import {AllAppList} from '@/apps/app-list'

interface IStore {
  isBackendAvailable: boolean
  tasks: TaskItem[]
  activeId: string
}

export const useSystemStore = defineStore('system', {
  state: (): IStore => {
    return {
      tasks: [],
      activeId: '',
      isBackendAvailable: false,
    }
  },
  getters: {
    allApps(): ShortcutItem[] {
      if (this.isBackendAvailable) {
        return AllAppList
      }
      return AllAppList.filter((item) => !item.requireBackend)
    },
  },
  actions: {
    /**
     * 从快捷方式创建任务
     * @param shortcut
     */
    createTask(shortcut: ShortcutItem) {
      if (shortcut.singleInstance) {
        // 查找实例是否已经存在，防止重复启动
        const task = this.tasks.find((i) => i.component === shortcut.component)
        if (task) {
          this.setTaskActive(task)
          return
        }
      }
      const newTask = new TaskItem(shortcut)
      this.tasks = [...this.tasks, newTask]
      this.activeId = newTask.guid
    },
    /**
     * 关闭任务
     * @param guid
     */
    closeTask(guid) {
      const _tasks = [...this.tasks]
      const idx = _tasks.findIndex((i) => i.guid === guid)

      _tasks.splice(idx, 1)
      this.tasks = _tasks

      // 上一个应用的index
      let lastIdx = idx - 1
      if (!_tasks[lastIdx]) {
        // 如果不存在则设置为最后一个
        lastIdx = _tasks.length - 1
        if (!_tasks[lastIdx]) {
          lastIdx = -1
        }
      }
      if (lastIdx > -1) {
        this.setTaskActive(_tasks[lastIdx])
      }
    },
    /**
     * 关闭所有程序
     */
    shutdown() {
      this.tasks.forEach((task) => this.closeTask(task.guid))
    },
    /**
     * 激活任务
     * @param task
     * @param isTaskbar 是否来自任务栏
     */
    setTaskActive(task: TaskItem, isTaskbar = false) {
      // console.log('[setTaskActive]', task, isTaskbar)
      if (isTaskbar) {
        // 控制任务自动显示或隐藏
        if (this.activeId === task.guid) {
          task.minimized = !task.minimized
          return
        }
      }

      // 防止重复操作
      if (this.activeId === task.guid) {
        return
      }
      this.activeId = task.guid
      if (task.windowRef) {
        task.windowRef.setActive()
        task.minimized = false
      }
    },
  },
})
