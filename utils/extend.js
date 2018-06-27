const { type, isPlainObject, isFunction, isArray } = require('./type')

function extend() {
  // 默认不进行深拷贝
  let deep = false
  let name, options, src, copy, clone, copyIsArray
  let length = arguments.length
  // 记录复制对象下标
  let i = 1
  // 第一个参数不传布尔值的情况下，target 默认是第一个参数
  let target = arguments[0] || {}
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为 {}
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i]
    // 要求不能为空 避免 extend(a,,b) 这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性
        src = target[name]
        // 要复制的对象属性值
        copy = options[name]
        if (target === copy) {
          continue
        }

        // 要递归的对象必须是 plainObject 或者数组
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isArray(src) ? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

module.exports = extend