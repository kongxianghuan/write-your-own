
require('../call')

test('id sum', () => {
  const obj = { id: 0 }
  function logID() {
    let args = [...arguments]
    return args.reduce((prev, cur) => this.id += cur, args[0])
  }
  expect(logID.ownCall(obj, 1, 2, 3)).toBe(6)
})
