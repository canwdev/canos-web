import {NButton, NInput, NSpace} from 'naive-ui'

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

  return new Promise((resolve, reject) => {
    const editingValue = ref(value)
    const inputRef = ref()

    const handlePositiveClick = async () => {
      if (!editingValue.value && !allowEmpty) {
        return
      }
      if (typeof validateFn === 'function') {
        const message = await validateFn(editingValue.value)
        if (typeof message === 'string') {
          window.$message.error(message)
          return
        }
      }
      resolve(editingValue.value)
      d.destroy()
    }

    const d = window.$dialog.info({
      title: title,
      showIcon: false,
      autoFocus: false,
      onAfterEnter: () => {
        inputRef.value?.focus()
      },
      content: () =>
        h(
          NSpace,
          {size: 'small', vertical: true},

          () => [
            h(NInput, {
              ref: inputRef,
              value: editingValue.value,
              placeholder,
              type,
              clearable: true,
              'onUpdate:value': (v) => {
                editingValue.value = v
              },
              onKeydown: (event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handlePositiveClick()
                }
              },
            }),
          ],
        ),
      action: () =>
        h(NSpace, {size: 'small'}, () => [
          h(
            NButton,
            {
              type: 'primary',
              disabled: !allowEmpty && !editingValue.value,
              onClick: handlePositiveClick,
            },
            () => 'OK',
          ),
          h(
            NButton,
            {
              onClick: () => {
                reject()
                d.destroy()
              },
            },
            () => 'Cancel',
          ),
        ]),
    })
  })
}
