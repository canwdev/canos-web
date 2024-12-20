import {showInputPrompt} from '@/components/CanUI/functions/input-prompt'
import {textConvertAdvanced, TextConvertMode, textConvertMultipleLine} from './text-convert'
import {handleExportFile, handleImportJson, handleReadSelectedFile, promptGetFileName} from './io'

export const mcUtils = {
  textConvertAdvanced,
  textConvertMultipleLine,
  TextConvertMode,
  handleExportFile,
  handleImportJson,
  handleReadSelectedFile,
  promptGetFileName,
  showInputPrompt,
}
