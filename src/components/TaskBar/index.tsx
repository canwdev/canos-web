import './style.scss'
import clsx from 'clsx'
import {useSnapshot} from 'valtio'
import {counterStore} from '../../store'
import StartMenu from '../StartMenu'
import {useState} from 'react'
import TrayClock from "./TrayClock.tsx";

const MyComponent = () => {
  const {count, setCount, tasks, activeIndex, handleCloseTask} = useSnapshot(counterStore)
  const [isShowStart, setIsShowStart] = useState(false)

  const handleAddTask = () => {
    counterStore.tasks = [...tasks, 'task' + count]
    setCount(count + 1)
    counterStore.activeIndex = tasks.length
  }

  return (
    <>
      {isShowStart && <StartMenu />}


      <div className="canos-task-bar">
        <div className="task-bar-container themed-frame">
          <div className="task-start-menu _fc">
            <button className="btn-no-style start-button themed-frame" onClick={() => setIsShowStart(!isShowStart)}>Start</button>
            <button className="btn-no-style start-button themed-frame" onClick={handleAddTask}>+</button>
          </div>
          <div className="task-list _fc">
            {tasks.map((item, index) => {
              return (
                <div
                  className={clsx('task-item btn-no-style themed-frame', index === activeIndex && 'active')}
                  key={item}
                  onClick={() => (counterStore.activeIndex = index)}
                >
                  <button className="btn-no-style ">
                    <span>[{index + 1}]</span> {item}
                  </button>
                  <button className="btn-no-style btn-close" onClick={() => handleCloseTask(index)}>X</button>
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
