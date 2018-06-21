jest.useFakeTimers()

var debounce = require('../debounce')

test('debounce test', function() {
  var test = jest.fn()
  var debounced = debounce(test, 1000)

  debounced()
  debounced()

  jest.runAllTimers()

  expect(test).toHaveBeenCalledTimes(1)
})
