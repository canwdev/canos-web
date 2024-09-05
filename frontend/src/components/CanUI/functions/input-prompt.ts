export const showInputPrompt = (options: any = {}): Promise<string> => {
  const {
    // 弹窗标题
    title = '',
    // 文本框预设内容
    value = '',
    // 文本框占位符
    placeholder = '',
    // 返回错误字符串表示错误，否则校验成功
    validateFn,
    // 文本框类型
    type = 'text',
    // 是否允许空
    allowEmpty = false,
  } = options

  return new Promise<string>((resolve, reject) => {
    window.$dialog
      .prompt(placeholder, title, {
        inputType: type,
        inputValue: value,
        inputValidator: (val) => {
          if (!allowEmpty && val === '') {
            return 'input value is required'
          }
          if (validateFn) {
            return validateFn(val)
          }
          return
        },
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      })
      .then(({value}) => {
        resolve(value)
      })
      .catch(() => {
        reject()
      })
  })
}
