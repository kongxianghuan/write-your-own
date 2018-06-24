const class2type = {}

'Boolean Number String Function Array Date RegExp Object Error'
  .split(' ').map((item, index) => {
    class2type[`[object ${item}]`] = item.toLowerCase()
  })

module.exports = (obj) => {
  // null和undefined会被Object.prototype.toString识别成[object Object]
  // undfinde == null，如果obj为null或undefined，obj转为字符串即为类型返回
  if (obj == null) {
    return obj + ''
  }
  // 如果是基本类型，就使用 typeof，引用类型就使用 toString
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)] || "object"
    : typeof obj
}