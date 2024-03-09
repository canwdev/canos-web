import {ShortcutItem, TaskItem} from '@/enum/os'

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
        return window.$appList
      }
      return window.$appList.filter((item) => !item.requireBackend)
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
      const newTask = new TaskItem({...shortcut, minimized: true})
      this.tasks = [...this.tasks, newTask]
      setTimeout(() => {
        // 窗口出现动画
        newTask.minimized = false
        this.activeId = newTask.guid
      }, 100)
    },
    /**
     * 关闭任务
     * @param guid
     */
    closeTask(guid) {
      const _tasks = [...this.tasks]
      const idx = _tasks.findIndex((i) => i.guid === guid)

      // 窗口关闭动画
      const task = _tasks[idx]
      if (task) {
        task.minimized = true

        setTimeout(() => {
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
        }, 300)
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
