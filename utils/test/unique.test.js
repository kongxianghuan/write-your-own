const {
  _unique,
  filterUnique,
  objKeyUnique,
  setUnique,
  mapUnique
} = require('../unique')

test('unique test', () => {
  const arr1 = [1, '1', 'A', 'a', 1, 'a']
  expect(_unique(arr1)).toEqual([1, '1', 'A', 'a'])

  const arr2 = [1, 1, 2, 'a', 'A', 'A', 3, 3]
  expect(_unique(arr2, true)).toEqual([1, 2, 'a', 'A', 3])

  expect(_unique(arr1, false, v => {
    return typeof v === 'string' ? v.toLowerCase() : v
  })).toEqual([1, '1', 'A'])
})

test('filter unique test', () => {
  const arr = [1, '1', 'A', 'a', 1, 'a']
  expect(filterUnique(arr)).toEqual([1, '1', 'A', 'a'])
})

test('object key unique test', () => {
  const arr = [
    1, null, undefined, null, NaN, 1, '1', '1', NaN, undefined,
    { name: 1 }, { name: 1 }
  ]

  expect(objKeyUnique(arr)).toEqual([
    1, null, undefined, NaN, '1', { name: 1 }
  ])
})

test('set unique test', () => {
  const arr = [1, '1', 'A', 'a', 1, 'a']
  expect(setUnique(arr)).toEqual([1, '1', 'A', 'a'])
})

test('map unique test', () => {
  const arr = [1, '1', 'A', 'a', 1, 'a']
  expect(mapUnique(arr)).toEqual([1, '1', 'A', 'a'])
})