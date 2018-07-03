/**
 * 
 * @param {Function} fn 
 * @param {number} wait 
 * @param {Boolean} immediate 是否马上触发
 */
exports.debounce = (fn, wait, immediate) => {
  let timeout = null
  let res = null

  let debounced = function(...args) {
    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      let callNow = !timeout
      if (callNow) {
        setTimeout(() => timeout = null, wait)
        res = fn.apply(this, args)
      }
    } else {
      timeout = setTimeout(() => fn.apply(this, args), wait)
    }

    return res
  }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

exports.rafDebounce = (fn) => {
  let timer = null
  return () => {
    cancelAnimationFrame(timer)
    timer = requestAnimationFrame(fn)
  }
}