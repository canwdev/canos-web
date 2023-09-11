import './style.scss'

const MyComponent = () => {
  return (
    <div className="start-menu">
      <div className="start-menu-row">
        <div className="start-menu-left">
          <div className="program-list">
            <div className="shortcut-list">
              <div className="shortcut-item">
                <div className="shortcut-icon"></div>
                <div className="shortcut-title">Notepad</div>
              </div>
              <div className="shortcut-split"></div>
            </div>
          </div>
        </div>
        <div className="start-menu-right">
          <div className="shortcut-list">
            <div className="shortcut-item">
              <div className="shortcut-icon"></div>
              <div className="shortcut-title">This PC</div>
            </div>
            <div className="shortcut-split"></div>
            <div className="shortcut-item">
              <div className="shortcut-icon"></div>
              <div className="shortcut-title">Control Panel</div>
            </div>
            <div className="shortcut-item">
              <div className="shortcut-icon"></div>
              <div className="shortcut-title">Run...</div>
            </div>
          </div>
        </div>
      </div>
      <div className="start-menu-row start-menu-bottom">
        <div className="start-menu-left">
          <input placeholder="Search apps" className="input-search" />
        </div>
        <div className="start-menu-right">
          <button>Power Menu</button>
        </div>
      </div>
    </div>
  )
}

export default MyComponent
