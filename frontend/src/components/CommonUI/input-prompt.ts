import {NButton, NInput, NSpace} from 'naive-ui'

export const showInputPrompt = (options: any = {}): Promise<string> => {
  const {
    title = '',
    value = '',
    placeholder = '',
    validateFn,
    type = 'text',
    allowEmpty = false,
  } = options

  return new Promise((resolve, reject) => {
    let editingValue = ref(value)
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
                  handlePositiveClick()
                  event.preventDefault()
                }
              },
            }),
          ]
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
            () => 'OK'
          ),
          h(
            NButton,
            {
              onClick: () => {
                reject()
                d.destroy()
              },
            },
            () => 'Cancel'
          ),
        ]),
    })
  })
}
