/*monaco config start*/
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  },
}
/*monaco config end*/

import * as monaco from 'monaco-editor'

import {emmetCSS, registerCustomSnippets} from 'emmet-monaco-es'
emmetCSS(monaco, ['css', 'scss'])

registerCustomSnippets('css', {
  // 自定义emmet
  mdm: `@media screen and (max-width: $mq_mobile_width) {
  \${1:}
}`,
  rtl: `&:dir(rtl) {
  \${1:}
}`,
})

export default monaco
