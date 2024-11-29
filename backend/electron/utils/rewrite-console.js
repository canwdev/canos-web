// 重写 console 方法
const rewriteConsole = () => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.log = (...args) => {
    // 调用原始方法
    originalConsoleLog(...args);

    // 发送到渲染进程
    global._electron_mainWindow && global._electron_mainWindow.webContents.send('console-log', {
      type: 'log',
      args: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
    });
  };
  console.error = (...args) => {
    originalConsoleError(...args);

    global._electron_mainWindow && global._electron_mainWindow.webContents.send('console-log', {
      type: 'error',
      args: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
    });
  };
  console.warn = (...args) => {
    originalConsoleWarn(...args);

    global._electron_mainWindow && global._electron_mainWindow.webContents.send('console-log', {
      type: 'warn',
      args: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
    });
  };
}

module.exports = {
  rewriteConsole
}