jest.useFakeTimers()

const { debounce } = require('../debounce')

test('debounce test', () => {
  let test = jest.fn()
  let debounced = debounce(test, 1000)

  debounced()
  debounced()

  jest.runAllTimers()

  expect(test).toHaveBeenCalledTimes(1)
})

test('debounce cancel', () => {
  let test = jest.fn()
  let debounced = debounce(test, 1000)

  debounced()
  debounced()
  debounced.cancel()

  jest.runAllTimers()

  expect(test).toHaveBeenCalledTimes(0)
})

test('debounce immediate', () => {
  let test = jest.fn()
  let debounced = debounce(test, 1000, true)

  debounced()
  debounced()

  jest.runAllTimers()

  expect(test).toHaveBeenCalledTimes(2)
})
