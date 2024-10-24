import {AutoFormItem, MixedFormItems} from './enum'

/**
 * 遍历所有表单item，执行操作
 */
export const traverseMixedFormItems = (
  items: MixedFormItems[],
  cb: (item: AutoFormItem) => void,
) => {
  items.forEach((item) => {
    if ('children' in item && Array.isArray(item.children)) {
      traverseMixedFormItems(item.children, cb)
    } else if (Array.isArray(item)) {
      traverseMixedFormItems(item, cb)
    } else {
      cb(item)
    }
  })
}

/**
 * 获取平铺的表单items
 */
export const getFlatFormItems = (formItems: MixedFormItems[]): AutoFormItem[] => {
  const flatFormItems: MixedFormItems[] = []

  traverseMixedFormItems(formItems, (item) => {
    flatFormItems.push(item)
  })

  return flatFormItems
}
