import {ElButton, ElInput, ElDialog} from 'element-plus'
import {ref, h} from 'vue'

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
      d.visible = false
    }

    const d = {
      visible: true,
      title,
      close: () => {
        reject()
        d.visible = false
      },
    }

    const dialog = h(
      ElDialog,
      {
        modelValue: d.visible,
        title,
        onClose: d.close,
        onOpen: () => {
          inputRef.value?.focus()
        },
      },
      {
        default: () => [
          h(ElInput, {
            ref: inputRef,
            modelValue: editingValue.value,
            placeholder,
            type,
            clearable: true,
            'onUpdate:modelValue': (v) => {
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
        footer: () => [
          h(
            ElButton,
            {
              type: 'primary',
              disabled: !allowEmpty && !editingValue.value,
              onClick: handlePositiveClick,
            },
            () => 'OK',
          ),
          h(
            ElButton,
            {
              onClick: d.close,
            },
            () => 'Cancel',
          ),
        ],
      },
    )

    // TODO
    window.$dialog.show(dialog)
  })
}
