// 对象和NaN不去重
exports._unique = (arr, isSorted, iteratee) => {
  let res = []
  let seen = []

  for (let i = 0, len = arr.length; i < len; i++) {
    let value = arr[i] 
    let computed = iteratee ? iteratee(value) : value

    // 如果是已排序的数组，判断相邻元素是否相同
    if (isSorted) {
      if (!i || seen !== computed) {
        seen = computed 
        res.push(value)
      }
    }
    // 迭代器处理过后放在seen数组中检验是否重复
    else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed)
        res.push(value)
      }
    }
    else if (res.indexOf(value) === -1) {
      res.push(value)
    }
  }

  return res
}

// 对象和NaN不去重，数字1不去重
exports.filterUnique = (arr) => {
  return arr.concat().sort().filter((v, i, arr) => {
    // indexOf方法返回第一个检索到的元素下标
    // indexOf检索得到下标跟元素下标不一致则证明元素前面已经有相同元素存在
    return arr.indexOf(v) === i
  })
}

// 全部去重
exports.objKeyUnique = (arr) => {
  let obj = {}
  return arr.filter((v, i, arr) => {
    // typeof区分1和'1'
    // JSON.stringify区分对象
    let key = typeof v + JSON.stringify(v)
    return obj.hasOwnProperty(key) ? false : (obj[key] = 1)
  })
}

// 对象不去重，NaN去重
exports.setUnique = (arr) => [...new Set(arr)]

exports.mapUnique = (arr) => {
  let seen = new Map()
  return arr.filter(v => !seen.has(v) && seen.set(v))
}