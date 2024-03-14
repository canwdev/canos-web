import {createGlobalState, useFetch, useScriptTag, useFileDialog} from '@vueuse/core'
import {copy} from './utils'
import moment from 'moment/moment'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import * as changeCase from 'change-case'

export type DynamicPlugin = (key: any) => QuickOptionItem

export type QuickLaunchPlugin = QuickOptionItem[] | DynamicPlugin[]

export const usePluginState = createGlobalState(() => {
  // 静态插件
  const staticPlugins = ref<QuickOptionItem[]>([])

  // 动态插件，接收一个ref值，根据值动态返回
  const dynamicPlugins = ref<DynamicPlugin[]>([])
  return {
    staticPlugins,
    dynamicPlugins,
  }
})

export const useQuickLaunchPlugins = (update) => {
  const {staticPlugins, dynamicPlugins} = usePluginState()

  onBeforeMount(() => {
    window.$qlUtils = {
      copy,
      moment,
      useFileDialog,
      changeCase,
      // 刷新列表
      update,
      // 添加一个插件
      addPlugin: (plugin: QuickOptionItem | DynamicPlugin) => {
        if (typeof plugin === 'function') {
          dynamicPlugins.value.push(plugin)
        } else {
          staticPlugins.value.push(plugin)
        }
        // 由于update函数使用了防抖，这里可以直接执行
        update()
      },
    }
  })

  // 获取插件json
  const {isFetching, onFetchResponse, data} = useFetch('q-plugins/index.json').get().json()

  onFetchResponse(async (res) => {
    const {plugins} = data.value
    // 逐个加载js文件
    for (const pluginsKey in plugins) {
      const url = plugins[pluginsKey]
      const {load} = useScriptTag(
        url,
        () => {
          // do something
        },
        {manual: true}
      )
      await load()
    }
  })
}
