import './style.scss'
import clsx from 'clsx'
import {useSnapshot} from 'valtio'
import {taskStore} from '../../store'
import StartMenu from '../StartMenu'
import {useState} from 'react'
import TrayClock from './TrayClock.tsx'
import {launchProgram, SystemShortcuts} from '../../enum'

const MyComponent = () => {
  const {tasks, activeIndex, handleCloseTask} = useSnapshot(taskStore)
  const [isShowStart, setIsShowStart] = useState(false)

  const handleAddTask = () => {
    const list = Object.values(SystemShortcuts)
    const idx = Math.floor(Math.random() * list.length)
    launchProgram(list[idx])
  }

  return (
    <>
      {isShowStart && <StartMenu onClose={() => setIsShowStart(false)} />}

      <div className="canos-task-bar">
        <div className="task-bar-container themed-frame">
          <div className="task-start-menu _fc">
            <button
              className={clsx('btn-no-style start-button themed-frame', isShowStart && 'active')}
              onClick={() => setIsShowStart(!isShowStart)}
            >
              Start
            </button>
            <button className="btn-no-style start-button themed-frame" onClick={handleAddTask}>
              +
            </button>
          </div>
          <div className="task-list _fc">
            {tasks.map((item, index) => {
              return (
                <div
                  className={clsx(
                    'task-item btn-no-style themed-frame',
                    index === activeIndex && 'active'
                  )}
                  key={item.guid}
                  onClick={() => (taskStore.activeIndex = index)}
                >
                  <button className="btn-no-style ">
                    <img src={item.icon} alt={item.title} className="task-icon" /> {item.title}
                  </button>
                  <button className="btn-no-style btn-close" onClick={() => handleCloseTask(index)}>
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
          <div className="task-tray _fc">
            <div className="tray-list themed-field _fc">
              <TrayClock />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyComponent
