module.exports = function objectFactory() {
  var obj = new Object()
  var Constructor = [].shift.call(arguments)

  obj.__proto__ = Constructor.prototype

  var ret = Constructor.apply(obj, arguments)

  // 如果返回值是个对象就返回这个对象
  return typeof ret === 'object' ? ret : obj
}