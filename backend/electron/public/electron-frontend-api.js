if (window.electronAPI) {
  const {electronAPI} = window
  console.log('[window.electronAPI]', electronAPI)

  electronAPI.receiveMessage((event, data) => {
    console.log('收到消息:', data)
    if (data && data.openUrl) {
      window.open(data.openUrl)
    }
  })
  electronAPI.sendMessage('E_GET_OPEN_URL')


  const consoleOutput = document.getElementById('console_output');
  electronAPI.receiveConsole((event, data) => {
    console.log('收到log:', {event, data})
    const logElement = document.createElement('div');
    logElement.classList.add(`console-${data.type}`);

    // 将参数拼接成字符串
    logElement.textContent = data.args.join(' ');

    consoleOutput.appendChild(logElement);

    // 可选：限制显示行数
    if (consoleOutput.children.length > 100) {
      consoleOutput.removeChild(consoleOutput.firstChild);
    }
  })

} else {
  console.warn('Not running in electron environment')
}
