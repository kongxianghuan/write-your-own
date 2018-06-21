const objectFactory = require('../new')

test('New fn test', () => {
  function Bar(name) {
    this.name = name
    return 'test'
  }
  Bar.prototype.age = 18

  const bar = objectFactory(Bar, 'kk')

  expect(bar.name).toBe('kk')
  expect(bar.age).toBe(18)
})