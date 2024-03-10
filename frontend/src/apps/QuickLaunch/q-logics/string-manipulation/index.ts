import {Ref} from 'vue'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import * as changeCase from 'change-case'
import {copy} from '../utils'
import DynamicValueDisplay from './DynamicValueDisplay.vue'

export const qLogicStringManipulation = (valRef: Ref<string>): QuickOptionItem => {
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
        },
        render: h(
          DynamicValueDisplay,
          {class: 'font-code', label: type, text: valRef, formatFn: changeCase[type]},
          () => `${type}: `
        ),
      }
    }),
  }
}
