import {AutoFormItem, MixedFormItems} from './enum'

/**
 * 获取平铺的表单items
 */
export const getFlatFormItems = (formItems: MixedFormItems[]): AutoFormItem[] => {
  const flatFormItems: MixedFormItems[] = []

  const traverse = (items: MixedFormItems[]) => {
    items.forEach((item) => {
      if ('children' in item && Array.isArray(item.children)) {
        traverse(item.children)
      } else if (Array.isArray(item)) {
        traverse(item)
      } else {
        flatFormItems.push(item)
      }
    })
  }
  traverse(formItems)

  return flatFormItems
}
