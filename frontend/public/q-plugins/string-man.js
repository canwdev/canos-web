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
        const label = changeCase[type](type)
        return {
          label,
          props: {
            onClick: async () => {
              const result = changeCase[type](valRef.value)
              await copy(result, true)
            },
            class: 'font-code',
          },
          dynamicProps: {
            label,
            text: valRef,
            formatFn: (text) => changeCase[type](text || ''),
          },
        }
      }),
    }
  })
})()
