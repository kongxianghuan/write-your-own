/**
 * @param {Function} fn 需要throttle的函数
 * @param {Number} wait 函数调用时间间隔
 * @param {Object} options 自定义选项(trailing和leading不能同时为false)
 * @param {Boolean} options.leading (false不马上触发函数)
 * @param {Boolean} options.trailing (false最后一次延时调用不触发)
 */
module.exports = function throttle(fn, wait, options = {}) {
  let timeout, context, args, result
  let previous = 0

  // 延时调用
  let later = () => {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    fn.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled = function() {
    let now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = () => {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }

  return throttled
}
