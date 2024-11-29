const rewriteConsole = (mainWindow) => {
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  console.log = (...args) => {
    // 调用原始方法
    originalConsoleLog(...args);

    // 发送到渲染进程
    mainWindow.webContents.send('console-log', {
      type: 'log',
      args: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
    });
  };
  console.error = (...args) => {
    originalConsoleError(...args);
    mainWindow.webContents.send('console-log', {
      type: 'error',
      args: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      )
    });
  };
  console.warn = (...args) => {
    originalConsoleWarn(...args);
    mainWindow.webContents.send('console-log', {
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