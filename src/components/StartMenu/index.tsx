import './style.scss'
import {launchProgram, SystemShortcuts} from '../../enum'

const MyComponent = ({onClose}) => {
  const systemShortcuts = [
    SystemShortcuts.MyComputer,
    SystemShortcuts.ControlPanel,
    null,
    SystemShortcuts.Run,
  ]
  const programShortcuts = [SystemShortcuts.Notepad, null]

  const genShortcutList = (list) => {
    return list.map((item, index) => {
      if (!item) {
        return <div className="shortcut-split" key={`split` + index}></div>
      }
      const handleClick = (item) => {
        onClose()
        launchProgram(item)
      }
      return (
        <div className="shortcut-item" key={item.name} onClick={() => handleClick(item)}>
          <div className="shortcut-icon">
            {item.icon && <img src={item.icon} alt={item.name} />}
          </div>
          <div className="shortcut-title">{item.name}</div>
        </div>
      )
    })
  }

  return (
    <div className="start-menu themed-frame">
      <div className="start-menu-row">
        <div className="start-menu-left">
          <div className="program-list themed-field">
            <div className="shortcut-list">{genShortcutList(programShortcuts)}</div>
          </div>
        </div>
        <div className="start-menu-right">
          <div className="shortcut-list">{genShortcutList(systemShortcuts)}</div>
        </div>
      </div>
      <div className="start-menu-row start-menu-bottom">
        <div className="start-menu-left">
          <input disabled placeholder="Search apps" className="input-search themed-field" />
        </div>
        <div className="start-menu-right">
          <button disabled className="themed-frame btn-no-style">
            Power Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyComponent
