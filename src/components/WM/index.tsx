import './style.scss'
import clsx from 'clsx'
import {taskStore} from '../../store'
import {useSnapshot} from 'valtio'
import Window from './Window.tsx'
import {useEffect, useRef} from 'react'

const MyComponent = ({children}) => {
  const {tasks, activeIndex, handleCloseTask} = useSnapshot(taskStore)

  const windowRefs = useRef([])

  useEffect(() => {
    if (windowRefs[activeIndex]) {
      windowRefs[activeIndex].setActive()
    }
  }, [activeIndex])

  return (
    <div className="window-manager">
      {children}
      {tasks.map((item, index) => {
        return (
          <Window
            key={item.guid}
            taskItem={item}
            onClose={() => handleCloseTask(index)}
            onActive={() => (taskStore.activeIndex = index)}
            ref={(el) => (windowRefs[index] = el)}
          >
            <div
              className={clsx(
                'task-window-content',
                'themed-field',
                index === activeIndex && 'active'
              )}
            >
              {item.guid} <br />
              {item.title} <br />
              {item.icon} <br />
            </div>
          </Window>
        )
      })}
    </div>
  )
}

export default MyComponent
