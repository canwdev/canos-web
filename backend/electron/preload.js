const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // 可以添加与主进程通信的方法
  sendMessage: (message) => ipcRenderer.send('message', message),
  receiveMessage: (callback) => ipcRenderer.on('message', callback),
  receiveConsole: (callback) => ipcRenderer.on('console-log', callback),
})