;(function () {
  const {copy, addPlugin} = window.$qlUtils
  const evalCode = (val, isToast = false) => {
    try {
      return eval(val)
    } catch (error) {
      console.log(error)
      if (isToast) {
        window.$message.error(error.message)
      } else {
        return error.message
      }
    }
  }
  const isTimestamp = (val) => {
    val = Number(val)
    const d = new Date(val)
    if (d.getTime() > 0) {
      return d
    }
    return false
  }

  addPlugin((valRef) => {
    const date = isTimestamp(valRef.value)
    if (date) {
      const label = window.$qlUtils.moment(date).format('YYYY-MM-DD HH:mm:ss')
      return {
        label: '📋 ' + label,
        props: {onClick: () => copy(label, true)},
      }
    }
  })

  addPlugin((valRef) => {
    return {
      label: '⚡ JavaScript Eval',
      props: {
        onClick: async () => {
          await copy(evalCode(valRef.value, true), true)
        },
      },
    }
  })

  addPlugin((valRef) => {
    return {
      label: '⚡ Realtime Eval',
      children: [
        {
          label: '',
          props: {
            onClick: async () => {
              await copy(evalCode(valRef.value, true), true)
            },
            class: 'font-code',
          },
          dynamicProps: {
            label: 'eval()',
            text: valRef,
            formatFn: (val) => {
              return evalCode(val)
            },
          },
        },
      ],
    }
  })
})()
