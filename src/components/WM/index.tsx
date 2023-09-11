import './style.scss'
import clsx from 'clsx'
import {counterStore} from '../../store'
import {useSnapshot} from 'valtio'
import Window from './Window.tsx'
import {useEffect, useRef} from 'react'

const MyComponent = () => {
  const {tasks, activeIndex, handleCloseTask} = useSnapshot(counterStore)

  const windowRefs = useRef([])

  useEffect(() => {
    if (windowRefs[activeIndex]) {
      windowRefs[activeIndex].setActive()
    }
  }, [activeIndex])

  return (
    <div className="window-manager">
      {tasks.map((item, index) => {
        return (
          <Window
            key={item}
            onClose={() => handleCloseTask(index)}
            onActive={() => (counterStore.activeIndex = index)}
            ref={(el) => (windowRefs[index] = el)}
          >
            <div
              className={clsx('task-window-content', index === activeIndex && 'active')}
              key={item}
              onClick={() => (counterStore.activeIndex = index)}
            >
              {item}
            </div>
          </Window>
        )
      })}
    </div>
  )
}

export default MyComponent
