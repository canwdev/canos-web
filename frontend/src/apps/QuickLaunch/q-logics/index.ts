import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {qLogicBase64, qLogicDateTime, qLogicEval, qLogicEval2, qLogicEyeDrop} from './common'
import {qLogicQrCode} from './qr-code'
import {Ref} from 'vue'
import {qLogicStringManipulation} from './string-manipulation'
import {qLogicSpeechSynthesis} from './speech-synthesis'
import {useDebounceFn} from '@vueuse/core'

export const useQLogics = (qlOptionsRef) => {
  const filteredOptions = ref<QuickOptionItem[]>([])

  const _handleSearch = (valRef: Ref<string>) => {
    let options: QuickOptionItem[] = []
    const val = valRef.value
    if (val === '/?') {
      const label = `❓帮助说明：
- 支持输入时间戳，如：1709794946384
- 输入 /? 查看帮助
- 按 tab 键切换到下方功能列表，再按 esc 聚焦到输入框
- 部分功能支持多行文本`
      options.push({
        label,
      })
    }
    const extraOptions = [
      qLogicStringManipulation(valRef),
      qLogicBase64(valRef),
      qLogicQrCode(valRef),
      qLogicSpeechSynthesis(valRef),
    ]
    const filterableOptions = [...qlOptionsRef.value, qLogicEyeDrop]

    // 没有输入，显示默认内容
    if (!val) {
      filteredOptions.value = [...options, ...filterableOptions, ...extraOptions]
      return
    }
    filteredOptions.value = [
      ...options,
      // 过滤列表功能
      ...filterableOptions.filter((i) => {
        const sVal = val.trim().toLowerCase()
        let flag = false
        if (i.search) {
          flag = i.search.toLowerCase().includes(sVal)
        }
        if (!flag && i.label) {
          flag = i.label.toLowerCase().includes(sVal)
        }
        return flag
      }),
      qLogicDateTime(val),
      qLogicEval(val),
      qLogicEval2(valRef),
      ...extraOptions,
    ].filter((val) => !!val)
  }

  const handleSearch = useDebounceFn(_handleSearch, 100)

  return {
    handleSearch,
    filteredOptions,
  }
}
