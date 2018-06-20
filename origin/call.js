Function.prototype.ownCall = function(context) {
  var context = context || global
  var prefix = 'own'
  var id = prefix + Math.random()

  // 生成context唯一属性名
  while (context.hasOwnProperty(id)) {
    id = prefix + Math.random()
  }
  context[id] = this

  // 参数字符串
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  // 条用eval args自动调用Array.toString()转为字符串
  var res = eval('context[id](' + args + ')')
  delete context[id]

  return res
}