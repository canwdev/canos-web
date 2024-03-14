;(function () {
  const {addPlugin, changeCase, copy} = window.$qlUtils

  addPlugin((valRef) => {
    return {
      label: '🪢 String Manipulation',
      children: [
        'paramCase',
        'snakeCase',
        'camelCase',
        'pascalCase',
        'constantCase',
        'dotCase',
        'headerCase',
        'pathCase',
        'capitalCase',
        'sentenceCase',
        'noCase',
      ].map((type) => {
        return {
          label: type,
          props: {
            onClick: async () => {
              const result = changeCase[type](valRef.value)
              await copy(result, true)
            },
            class: 'font-code',
          },
          dynamicProps: {
            label: type,
            text: valRef,
            formatFn: (text) => changeCase[type](text || ''),
          },
        }
      }),
    }
  })
})()
