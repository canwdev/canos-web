const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const {spawn} = require('child_process')

global._electron_ipcMain = ipcMain
const {rewriteConsole} = require('./utils/rewrite-console')
require('../dist/main.js')

let mainWindow
let nestProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  rewriteConsole(mainWindow)
  require('./utils/version-check.js')

  // 启动 Nest.js 服务
  nestProcess = spawn('npm', ['run', 'start'], {
    stdio: 'inherit',
    shell: true,
  })

  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
    if (nestProcess) {
      nestProcess.kill()
    }
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
