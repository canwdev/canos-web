// 自定义表列
import {Ref, ref} from 'vue'
import {useStorage} from '@vueuse/core'
import {AutoTableColumn} from './types'

interface IOption {
  label: string
  value: string
}

export const useCustomColumns = (props) => {
  const {columns} = toRefs(props) as {
    columns: Ref<AutoTableColumn[]>
  }
  const isShowColumnEdit = ref(false)

  const columnsOptions = ref<IOption[]>([])
  const getTableColumnsOptions = () => {
    if (!columns.value || !columns.value.length) {
      return []
    }
    const options: IOption[] = []

    columns.value.forEach((item) => {
      if (!item.label || item.isCustomizeColumn) {
        return
      }
      if (!item.label) {
        return
      }

      options.push({
        label: item.label,
        value: item.key || item.label,
      })
    })

    return options
  }
  watch(isShowColumnEdit, (val) => {
    if (val) {
      columnsOptions.value = getTableColumnsOptions()
    } else {
      columnsOptions.value = []
      filteredColumns.value = getFilteredColumns()
    }
  })

  const hiddenColumnKeyMap = useStorage(props.customizeColumnStorageKey, {})
  const handleUpdateCheck = (key) => {
    if (hiddenColumnKeyMap.value[key]) {
      delete hiddenColumnKeyMap.value[key]
    } else {
      hiddenColumnKeyMap.value[key] = 1
    }
  }

  const filteredColumns = ref<AutoTableColumn[]>([])
  const getFilteredColumns = (): AutoTableColumn[] => {
    if (!columns.value) {
      return []
    }
    if (!hiddenColumnKeyMap.value || !Object.values(hiddenColumnKeyMap.value).length) {
      return columns.value
    }

    return columns.value.filter((item) => {
      if (!item.label) {
        return true
      }
      const key = item.key || item.label
      return !hiddenColumnKeyMap.value[key]
    })
  }

  onBeforeMount(() => {
    filteredColumns.value = getFilteredColumns()
  })

  return {
    isShowColumnEdit,
    hiddenColumnKeyMap,
    columnsOptions,
    filteredColumns,
    handleUpdateCheck,
  }
}
