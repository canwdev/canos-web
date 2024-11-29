const actionRow = document.getElementById('action_row');
const createActionButton = (label, cb) => {
  const btn = document.createElement('button');
  btn.addEventListener('click', cb)
  btn.innerHTML = label
  actionRow.appendChild(btn)
  return btn
}

const createSelectOptions = (options, changeCb) => {
  // 创建 select 元素
  const selectElement = document.createElement('select');

  // 遍历 options 数组，为每个选项创建 option 元素
  options.forEach(option => {
    const optionElement = document.createElement('option');

    // 设置 option 的 value 和文本内容
    optionElement.value = option.value;
    optionElement.textContent = option.label;

    // 将 option 添加到 select 中
    selectElement.appendChild(optionElement);
  });

  // 如果提供了变更回调函数，添加事件监听器
  if (typeof changeCb === 'function') {
    selectElement.addEventListener('change', (event) => {
      // 调用回调函数，传入当前选中的值
      changeCb(event.target.value);
    });
  }

  actionRow.appendChild(selectElement)
  return selectElement
};

if (window.electronAPI) {
  const {electronAPI} = window
  console.log('[window.electronAPI]', window.electronAPI)

  createActionButton('❌ Exit', () => {
    electronAPI.exit()
  })

  // 是否已经获取url列表
  let isGetUrls = false

  electronAPI.receiveMessage((event, data) => {
    console.log('收到消息:', data)
    if (data && data.openUrl) {
      isGetUrls = true
      createActionButton('🌐 IP Chooser UI', () => {
        electronAPI.openExternal(data.openUrl)
      })
      createSelectOptions([
        {label: '🛜 Select an IP to access:', value: ''},
        ...data.urls.map(i => ({label: i, value: i}))
      ], (url) => {
        if (url) {
          electronAPI.openExternal(url)
        }
      })
    }
  })

  // 轮询获取url
  let timer = setInterval(() => {
    if (isGetUrls) {
      clearInterval(timer)
      return
    }
    electronAPI.sendMessage('E_GET_OPEN_URL')
  }, 500)
  electronAPI.sendMessage('E_GET_OPEN_URL')


  const consoleOutput = document.getElementById('console_output');
  electronAPI.receiveConsole((event, data) => {
    // console.log('收到log:', {event, data})
    const logElement = document.createElement('div');
    logElement.classList.add(`console-line`);
    logElement.classList.add(`${data.type}`);

    // 将参数拼接成字符串
    logElement.textContent = data.args.join(' ');

    consoleOutput.appendChild(logElement);

    // 可选：限制显示行数
    if (consoleOutput.children.length > 30) {
      consoleOutput.removeChild(consoleOutput.firstChild);
    }

    setTimeout(() => {
      logElement.scrollIntoView();
    })
  })

} else {
  console.warn('Not running in electron environment')
}
