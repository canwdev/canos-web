import {copyToClipboard} from '@/utils'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import moment from 'moment'

export const useQLogics = (qlOptionsRef) => {
  const filteredOptions = ref<QuickOptionItem[]>([])

  const copy = async (val) => {
    if (typeof val === 'object') {
      console.info(val)
      val = JSON.stringify(val, null, 2)
    }
    console.info(val)
    await copyToClipboard(val)
    window.$message.success('Copied')
  }
  const isTimestamp = (val) => {
    val = Number(val)
    const d = new Date(val)
    if (d.getTime() > 0) {
      return d
    }
    return false
  }

  const handleInput = (val?) => {
    let extraOptions: QuickOptionItem[] = []

    const date = isTimestamp(val)
    if (date) {
      const label = moment(date).format('YYYY-MM-DD HH:mm:ss')
      extraOptions.push({
        label: '📋 ' + label,
        props: {onClick: () => copy(label)},
      })
    } else if (val === '/?') {
      const label = `❓帮助说明：
- 支持输入时间戳，如：1709794946384
- 输入 /? 查看帮助
- 按 tab 键切换到下方功能列表，再按 esc 聚焦到输入框
- 部分功能支持多行文本`
      extraOptions.push({
        label,
      })
    }

    // 没有输入，显示默认内容
    if (!val) {
      filteredOptions.value = [...extraOptions, ...qlOptionsRef.value]
      return
    }
    filteredOptions.value = [
      ...extraOptions,
      // 过滤列表功能
      ...qlOptionsRef.value.filter((i) => {
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
      {
        label: '⚡ Eval JavaScript',
        props: {
          onClick: async () => {
            try {
              const result = eval(val)
              window.$message.success(result + '')
              await copy(result)
            } catch (error: any) {
              console.log(error)
              window.$message.error(error.message)
            }
          },
        },
      },
    ]
  }

  return {
    copy,
    isTimestamp,
    handleInput,
    filteredOptions,
  }
}
