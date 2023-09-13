import IconFile from '../assets/shell32/shell32.dll(1).png'
import IconComputer from '../assets/shell32/shell32.dll(16).png'
import IconRecycle from '../assets/shell32/shell32.dll(32).png'
import IconControl from '../assets/shell32/shell32.dll(22).png'
import {taskStore} from '../store'
import {guid} from '../utils'

export interface ShortcutItem {
  name: string
  icon: string
}

export const SystemShortcuts = {
  MyComputer: {
    icon: IconComputer,
    name: 'My Computer',
  },
  RecycleBin: {
    icon: IconRecycle,
    name: 'Recycle Bin',
  },
  ControlPanel: {
    icon: IconControl,
    name: 'Control Panel',
  },
  Run: {
    icon: IconFile,
    name: 'Run...',
  },
  Notepad: {
    icon: IconFile,
    name: 'Notepad',
  },
}

export interface TaskItem {
  guid: string
  title: string
  icon: string
  width: number
  height: number
  top: number
  left: number
}

export const launchProgram = (shortcut: ShortcutItem): TaskItem => {
  const task: TaskItem = {
    guid: guid(),
    title: shortcut.name,
    icon: shortcut.icon,
    width: 320,
    height: 240,
    top: 100,
    left: 100,
  }
  taskStore.tasks.push(task)
  taskStore.activeIndex = taskStore.tasks.length
  return task
}
