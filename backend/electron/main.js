const {app, BrowserWindow, ipcMain, shell, nativeImage, Tray, Menu} = require('electron')
const path = require('path')
const {rewriteConsole} = require('./utils/rewrite-console')
const {versionCheck} = require('./utils/version-check')
versionCheck()

const isDev = process.env.NODE_ENV === 'development'

global._electron_ipcMain = ipcMain

ipcMain.on('open-external', (event, data) => {
  shell.openExternal(data)
})
ipcMain.on('exit', (event, data) => {
  app.quit();
})

rewriteConsole()

let mainWindow
// 全局变量，方便外部使用
global._electron_mainWindow = null


const showWindow = () => {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    createWindow()
  }
}

const hideWindow = () => {
  if (mainWindow) {
    // 销毁窗口，节省内存
    mainWindow.close();
    // mainWindow.hide();
  }
}

const toggleShowHide = () => {
  if (mainWindow && mainWindow.isVisible()) {
    hideWindow();
  } else {
    showWindow();
  }
}


let tray
const createTrayIcon = (mainWindow) => {
  if (tray) {
    return
  }

  // 创建托盘图标
  const iconPath = path.join(__dirname, '../build/icon.ico'); // 替换为你的图标路径
  const icon = nativeImage.createFromPath(iconPath);

  tray = new Tray(icon);

  // 创建托盘右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Toggle Show/Hide',
      click: () => {
        toggleShowHide()
      }
    },
    {
      label: 'Exit',
      click: () => {
        app.quit();
      }
    }
  ]);

  // 设置托盘图标的悬停提示
  tray.setToolTip('CanOS Server');

  // 设置托盘右键菜单
  tray.setContextMenu(contextMenu);

  // 单击托盘图标事件
  tray.on('click', () => {
    toggleShowHide()
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  global._electron_mainWindow = mainWindow
  mainWindow.setMenuBarVisibility(false)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }



  mainWindow.loadFile(path.join(__dirname, 'public/index.html'))
  createTrayIcon(mainWindow)

  mainWindow.on('closed', () => {
    mainWindow = null
    global._electron_mainWindow = null
  })

  // 监听窗口最小化事件
  // mainWindow.on('minimize', (event) => {
  //   event.preventDefault(); // 阻止默认的最小化行为
  //   hideWindow();
  // });
}

// 单例模式
// 尝试获取单例锁
const gotSingleLock = app.requestSingleInstanceLock();

if (!gotSingleLock) {
  // 如果获取锁失败，说明已有另一个实例在运行，直接退出
  app.quit();
  return;
}

app.on('ready', () => {
  createWindow()
  setTimeout(() => {
    // 启动 Nest.js 服务
    require('../dist/main.js')
    versionCheck()

  }, 500)
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 当第二个实例试图启动时
app.on('second-instance', (event, commandLine, workingDirectory) => {
  showWindow()
});