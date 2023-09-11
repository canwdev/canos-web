import './style.scss'
import clsx from 'clsx'
import {useSnapshot} from 'valtio'
import {counterStore} from '../../store'
import StartMenu from '../StartMenu'
import {useState} from 'react'

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
      <div className="taskman-lite">
        <div className="task-item" key="__start__" onClick={() => setIsShowStart(!isShowStart)}>
          <button className="btn-add">Start</button>
        </div>
        <div className="task-item" key="__add__" onClick={handleAddTask}>
          <button className="btn-add">+</button>
        </div>
        {tasks.map((item, index) => {
          return (
            <div
              className={clsx('task-item', index === activeIndex && 'active')}
              key={item}
              onClick={() => (counterStore.activeIndex = index)}
            >
              <button className="btn-taskname">
                <span>[{index + 1}]</span> {item}
              </button>
              <button onClick={() => handleCloseTask(index)}>X</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MyComponent
