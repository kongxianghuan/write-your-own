module.exports = (fn, wait, immediate) => {
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