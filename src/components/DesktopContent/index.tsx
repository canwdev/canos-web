import './style.scss'
import {useState} from 'react'
import {launchProgram, ShortcutItem, SystemShortcuts} from '../../enum'

const MyComponent = () => {
  const [files, setFiles] = useState<ShortcutItem[]>(Object.values(SystemShortcuts))

  const handleIconClick = (item) => {
    launchProgram(item)
  }

  return (
    <div className="desktop-content">
      {files.map((item) => {
        return (
          <div className="desktop-icon-wrap" onClick={() => handleIconClick(item)} key={item.name}>
            <div className="desktop-icon">
              <img className="desktop-icon-image" src={item.icon}></img>
              <div className="desktop-icon-name">{item.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyComponent
