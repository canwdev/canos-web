import {createGlobalState, useFetch, useScriptTag, useFileDialog} from '@vueuse/core'
import {copy} from './utils'
import moment from 'moment/moment'
import {QuickOptionItem} from '@/components/CommonUI/QuickOptions/enum'
import * as changeCase from 'change-case'
import {filterLabel} from './utils'

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

  const basePath = `q-plugins`
  const unloadFns = ref<any[]>([])

  // 重新加载所有插件
  const reloadPlugins = async () => {
    dynamicPlugins.value = []
    staticPlugins.value = []
    if (unloadFns.value.length) {
      console.log('[reloadPlugins] unloading plugin scripts...')
      for (const key in unloadFns.value) {
        const unload = unloadFns.value[key]
        await unload()
      }
      unloadFns.value = []
    }

    // 获取插件json
    const res = await fetch(`${basePath}/index.json`)
    const data = await res.json()
    const {plugins} = data
    console.log('[reloadPlugins] loading plugins...', plugins)
    // 逐个加载js文件
    for (const pluginsKey in plugins) {
      let url = plugins[pluginsKey]

      const outboundUrlRegex = /^(?:http(s)?:\/\/)/
      // 允许相对路径
      if (!outboundUrlRegex.test(url)) {
        url = basePath + '/' + url
      }
      const {load, unload} = useScriptTag(
        url,
        () => {
          // do something
        },
        {manual: true}
      )
      unloadFns.value.push(unload)
      await load()
    }
  }

  // 添加一个插件
  const addPlugin = (plugin: QuickOptionItem | DynamicPlugin) => {
    // console.log('[addPlugin]', plugin)
    if (typeof plugin === 'function') {
      dynamicPlugins.value.push(plugin)
    } else {
      staticPlugins.value.push(plugin)
    }
    // 由于update函数使用了防抖，这里可以直接执行
    update()
  }

  onBeforeMount(() => {
    window.$qlUtils = {
      copy,
      moment,
      useFileDialog,
      changeCase,

      ref,
      computed,
      watch,

      // 过滤列表功能
      filterLabel,
      // 刷新列表
      update,
      // 重新加载所有插件
      reloadPlugins,
      // 添加一个插件
      addPlugin,
    }

    reloadPlugins()
  })
}
