import React from 'react'
import ReactDOM from 'react-dom/client'
import TaskBar from './components/TaskBar'
import 'normalize.css'
import './styles/style.scss'
import './styles/theme-win98.scss'
import WM from './components/WM'
import DesktopContent from "./components/DesktopContent";
import DesktopWallpaper from "./components/DesktopWallpaper";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WM>
      <DesktopWallpaper>
        <DesktopContent/>
      </DesktopWallpaper>
    </WM>
    <TaskBar />
  </React.StrictMode>
)
