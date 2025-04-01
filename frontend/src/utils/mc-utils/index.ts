// import {pinyin} from 'pinyin-pro'
// import {formatI18nKey} from '@/enum/vue-i18n-tool'
import {copy, textConvertAdvanced, TextConvertMode, textConvertMultipleLine} from './text-convert'
import {
  handleExportFile,
  handleImportJson,
  handleImportTextFile,
  handleReadSelectedFile,
  promptGetFileName,
} from './io'
import {showInputPrompt} from './input-prompt'
import * as changeCase from 'change-case'

export const mcUtils = {
  copy,
  changeCase,
  // pinyin,
  // formatI18nKey,
  textConvertAdvanced,
  textConvertMultipleLine,
  TextConvertMode,
  handleExportFile,
  handleImportTextFile,
  handleImportJson,
  handleReadSelectedFile,
  promptGetFileName,
  showInputPrompt,
}
