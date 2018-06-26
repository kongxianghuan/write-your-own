const flatten = (arr) => {
  let res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    let val = arr[i]
    if (Array.isArray(val)) {
      res = res.concat(flatten(val))
    } else {
      res.push(val)
    }
  }
  return res
}

exports.flatten = flatten

