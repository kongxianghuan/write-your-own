Function.prototype.ownApply = function(context, arr) {
  context = context || global
  var prefix = 'own'
  var id = prefix + Math.random()
  while (context.hasOwnProperty(id)) {
    id = prefix + Math.random()
  }
  context[id] = this
  var args = []
  var res = null
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      args.push('arr['+ i +']')
    }
    res = eval('context[id](' + args + ')')
  } else {
    res = context[id]()
  }

  delete context[id]
  return res
}