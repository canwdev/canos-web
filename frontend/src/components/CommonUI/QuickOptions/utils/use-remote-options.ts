import {QuickOptionItem} from '../enum'

export const useRemoteOptions = ({fetchFn, mapFn}) => {
  const options = ref<QuickOptionItem[]>([])

  const traverse = (list: any[] = [], result: QuickOptionItem[] = []) => {
    list.forEach((item: any) => {
      const r: QuickOptionItem = {
        children: item.children ? traverse(item.children) : undefined,
        ...mapFn(item),
      }

      result.push(r)
    })
    return result
  }

  const loadOptions = async () => {
    const data = await fetchFn()
    options.value = traverse(data)
  }
  onMounted(loadOptions)

  return {
    options,
    traverse,
    loadOptions,
  }
}
