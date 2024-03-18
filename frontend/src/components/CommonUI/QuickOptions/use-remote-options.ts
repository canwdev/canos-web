import {QuickOptionItem} from './enum'

export const useRemoteOptions = ({fetchFn, mapFn}) => {
  const options = ref<QuickOptionItem[]>([])
  const loadOptions = async () => {
    const data = await fetchFn()

    const traverse = (list: any[] = [], result: QuickOptionItem[] = []) => {
      list.forEach((i: any) => {
        const r: QuickOptionItem = {
          children: i.children ? traverse(i.children) : undefined,
          ...mapFn(i),
        }

        result.push(r)
      })
      return result
    }
    options.value = traverse(data)
  }
  onMounted(loadOptions)

  return {
    options,
    loadOptions,
  }
}
