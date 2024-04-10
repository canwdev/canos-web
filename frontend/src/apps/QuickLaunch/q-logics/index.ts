import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {qLogicQrCode} from './qr-code'
import {Ref} from 'vue'
import {useDebounceFn, useStorage} from '@vueuse/core'
import {usePluginState, useQuickLaunchCustomPlugins} from './plugins'
import {filterLabel} from './utils'
import {showInputPrompt} from '@/components/CommonUI/input-prompt'

const qLogicHelp = {
  label: `❓ 这是一个快捷工具箱，支持全键盘操作，帮你快速执行操作！
✨ 输入 /? 查看帮助
✨ 输入框按下 tab 键聚焦到下方功能列表，再按 esc 返回输入框
✨ 输入框按下 esc 可以清空
✨ 部分功能支持输入多行文本
✨ 支持输入时间戳，如：1709794946384
✨ 支持插件功能，你可以编写自己的插件
`,
}

export const useQLogics = (qlOptionsRef, update) => {
  const {staticPlugins, dynamicPlugins, customStaticPlugins, customDynamicPlugins} =
    usePluginState()
  const filteredOptions = ref<QuickOptionItem[]>([])

  const {qLogicManage, editingCustomPlugin, saveCustomPlugin, runCustomPlugin} =
    useQuickLaunchCustomPlugins(update)

  const _handleSearch = (valRef: Ref<string>) => {
    // console.log(valRef.value)
    const val = valRef.value

    const filterableOptions = [
      qLogicManage,
      ...customStaticPlugins.value,
      ...staticPlugins.value,
      qLogicQrCode(valRef),
    ]

    // 没有输入，显示默认内容
    if (!val) {
      filteredOptions.value = [...qlOptionsRef.value, {split: true}, ...filterableOptions]
      return
    }

    if (val === '/?') {
      filteredOptions.value = [qLogicHelp]
      return
    }
    // 过滤列表功能
    filteredOptions.value = [
      // 函数式插件，通过输入值来显示
      ...filterableOptions.filter((i) => filterLabel(i, val)),
      ...dynamicPlugins.value.map((f) => f(valRef)),
      ...customDynamicPlugins.value.map((f) => f(valRef)),
    ].filter((val) => !!val)
  }

  const handleSearch = useDebounceFn(_handleSearch, 100)

  return {
    handleSearch,
    filteredOptions,
    editingCustomPlugin,
    saveCustomPlugin,
    runCustomPlugin,
  }
}
