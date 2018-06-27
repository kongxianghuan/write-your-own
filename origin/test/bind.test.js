require('../bind')

var foo = { value: 1 }

function bar(name, age) {
  this.habit = 'shopping'
  this.name = name
  this.age = age
}
bar.prototype.friend = 'kevin'

var bindFoo = bar.ownBind(foo, 'daisy')

test('Fn bind test', () => {
  bindFoo(20)
  expect(foo).toEqual({ value: 1, name: 'daisy', habit: 'shopping', age: 20 })
})

test('Fn binded as constructor', () => {
  var obj1 = new bindFoo(18)
  expect(obj1).toEqual({ name: 'daisy', habit: 'shopping', age: 18 })
  expect(obj1.friend).toBe('kevin')
})