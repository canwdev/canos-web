// 自定义表列
import {computed, onMounted, ref} from 'vue'
import {useStorage} from '@vueuse/core'

interface IOption {
  label: string
  value: string
}

export const useCustomColumns = (props) => {
  const {tableSchema} = toRefs(props)
  const isShowColumnEdit = ref(false)

  const tableColumnsOptions = ref<IOption[]>([])
  const getTableColumnsOptions = () => {
    if (!tableSchema.value) {
      return []
    }
    const options: IOption[] = []

    tableSchema.value.columns.forEach((item) => {
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
      tableColumnsOptions.value = getTableColumnsOptions()
    } else {
      tableColumnsOptions.value = []
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

  const filteredColumns = ref([])
  const getFilteredColumns = () => {
    if (!tableSchema.value) {
      return []
    }
    const columns = tableSchema.value.columns || []
    if (!hiddenColumnKeyMap.value || !Object.values(hiddenColumnKeyMap.value).length) {
      return columns
    }

    return columns.filter((item) => {
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
    tableColumnsOptions,
    filteredColumns,
    handleUpdateCheck,
  }
}
