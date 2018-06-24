// 用来存放 toString 映射结果的对象
const class2type = {}

// 相当于 Object.prototype.toString
const toString = class2type.toString
// 相当于 Object.prototype.hasOwnProperty
const hasOwn = class2type.hasOwnProperty

'Boolean Number String Function Array Date RegExp Object Error'
  .split(' ').map((item, index) => {
    class2type[`[object ${item}]`] = item.toLowerCase()
  })

/**
 * 判断返回数据类型
 * 如果是基本类型，就使用 typeof，引用类型就使用 toString
 */
exports.type = (obj) => {
  // null和undefined会被Object.prototype.toString识别成[object Object]
  // undfinde == null，如果obj为null或undefined，obj转为字符串即为类型返回
  if (obj == null) {
    return obj + ''
  }
  // 如果是基本类型，就使用 typeof，引用类型就使用 toString
  return typeof obj === 'object' || typeof obj === 'function'
    // Symbol、Map、Set等类型，它们并不在class2type列表中，返回的结果会是object
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj
}

/**
 * 判断是否为纯对象
 * 纯对象的构造函数是 Objec 构造函数，或没有原型
 */
exports.isPlainObject = (obj) => {
  let proto, Ctor

  // 排除掉明显不是obj的以及一些宿主对象如Window
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getPrototypeOf(obj)

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  // 判断Ctor构造函数是不是Object构造函数，用的是hasOwn.toString.call(Ctor)不是Object.prototype.toString
  // hasOwn.toString 调用的其实是 Function.prototype.toString
  // hasOwn.toString.call(Ctor) => function Object() { [native code] }
  // Object.prototype.toString.call(Ctor) => [object Function]
  return typeof Ctor === 'function' && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
}

// isEmptyObject 就是判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false
exports.isEmptyObject = (obj) => {
  for (let name in obj ) {
      return false
  }
  return true
}

// Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
exports.isWindow = (obj) => obj != null && obj === obj.window

// 判断是否为类数组类型，数组和类数组都会返回 true
// 1.是数组
// 2.长度为 0
// 3.length 属性是大于 0 的数字类型，并且obj[length - 1]必须存在
exports.isArrayLike = (obj) => {
  // obj 必须有 length属性
  var length = !!obj && 'length' in obj && obj.length
  var typeRes = type(obj)

  // 排除掉函数和 Window 对象
  if (typeRes === 'function' || isWindow(obj)) {
    return false
  }

  return typeRes === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj
}

// 判断是否为DOM元素
exports.isElement = (obj) => !!(obj && obj.nodeType === 1)