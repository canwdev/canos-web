import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import {useSystemStore} from '@/store/system'
import ThemedIcon from '@/components/OS/ThemedIcon/ThemedIcon.vue'

export const useCommonTools = () => {
  const systemStore = useSystemStore()
  const qlOptions = computed((): QuickOptionItem[] => {
    const list: QuickOptionItem[] = []

    systemStore.allApps.forEach((item) => {
      list.push({
        label: item.title,
        search: item.appid,
        iconRender: h(ThemedIcon, {name: item.icon}),
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
