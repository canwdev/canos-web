;(function () {
  const {addPlugin, copy} = window.$qlUtils

  addPlugin({
    label: '💧 Eye Drop',
    search: 'eyedrop',
    props: {
      onClick: async () => {
        if ('EyeDropper' in window) {
          const eyeDropper = new window.EyeDropper()
          const result = await eyeDropper.open({})
          const {sRGBHex} = result
          await copy(sRGBHex, true)
        } else {
          window.$message.error(`window.EyeDropper is not supported`)
        }
      },
    },
  })

  addPlugin({
    label: '🔠 System Fonts',
    children: async () => {
      const fonts = await window.queryLocalFonts()

      return [
        ...fonts.map((v) => {
          return {
            label: v.fullName,
            props: {
              onClick: () => {
                copy(v.fullName, true)
              },
              style: {fontFamily: v.fullName},
            },
          }
        }),
      ]
    },
  })

  // https://eeejay.github.io/webspeechdemos/
  const synth = window.speechSynthesis
  if (!synth) {
    console.warn('window.speechSynthesis is not supported')
  } else {
    addPlugin((valRef) => {
      return {
        label: '🗣 Speech Synthesis',
        children: async () => {
          let voices = synth.getVoices()
          console.log(voices)
          return [
            ...voices.map((v) => {
              return {
                label: v.name,
                props: {
                  onClick: () => {
                    console.log(v, valRef.value)
                    const utterThis = new SpeechSynthesisUtterance(valRef.value)
                    utterThis.voice = v
                    utterThis.volume = 1
                    utterThis.pitch = 0.5

                    synth.speak(utterThis)
                  },
                },
              }
            }),
          ]
        },
      }
    })
  }
})()
