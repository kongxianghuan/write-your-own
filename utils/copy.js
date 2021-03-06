// 浅拷贝
exports.shallowCopy = (obj) => {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 简单深拷贝
exports.jsonDeepClone = (obj) => JSON.parse(JSON.stringify(obj))

// 深拷贝
const deepClone = (obj) => {
  if (typeof obj !== 'object') return
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object'
        ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
exports.deepClone = deepClone
