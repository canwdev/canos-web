/**
 * 深度比较两个对象的key是否一样
 * @param {Object} obj1 第一个对象
 * @param {Object} obj2 第二个对象
 */
export function isKeyEqual(obj1: any, obj2: any) {
  if (!obj1 || !obj2) {
    return false
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    if (!keys2.includes(key)) {
      return false
    }

    const value1 = obj1[key]
    const value2 = obj2[key]

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!isKeyEqual(value1, value2)) {
        return false
      }
    }
  }

  return true
}

/**
 * 深度合并两个对象的属性
 * @param {Object} obj1 第一个对象
 * @param {Object} obj2 第二个对象
 * @returns {Object} 合并后的新对象
 */
export function deepMerge(obj1: any, obj2: any) {
  const merged = {...obj1}

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
        if (
          typeof merged[key] === 'object' &&
          merged[key] !== null &&
          !Array.isArray(merged[key])
        ) {
          merged[key] = deepMerge(merged[key], obj2[key])
        } else {
          merged[key] = {...obj2[key]}
        }
      } else {
        merged[key] = obj2[key]
      }
    }
  }

  return merged
}
