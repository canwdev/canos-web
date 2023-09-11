import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TaskManagerLite from './components/TaskManagerLite'
import './index.css'
import WM from './components/WM'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <WM />
    <TaskManagerLite />
  </React.StrictMode>
)
