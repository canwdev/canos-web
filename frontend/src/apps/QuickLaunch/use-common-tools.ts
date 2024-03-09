import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {useSystemStore} from '@/store/system'

export const useCommonTools = () => {
  const systemStore = useSystemStore()
  const qlOptions = computed((): QuickOptionItem[] => {
    let list: QuickOptionItem[] = []

    systemStore.allApps.forEach((item) => {
      list.push({
        label: item.title,
        search: item.appid,
        icon: item.icon,
        props: {
          onClick: () => {
            systemStore.createTask(item)
          },
        },
      })
    })

    return list
  })

  return {
    qlOptions,
  }
}
