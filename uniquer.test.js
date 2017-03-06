import {New} from './uniquer.js'
import _ from 'lodash'

test('uniquer', () => {
  const tb = [
    ['a', 'a'],
    ['a', 'a1'],
    ['a', 'a2'],
  ]

  const u = New('', 1)

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    const fact = u(...para)

    expect(fact).toBe(hope)
  }
})

test('uniquer.gen', () => {
  const u = New()

  const tb = [
    ['a', 'a'],
    ['a_0', 'a'],
    ['a_1', 'a'],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(u.gen(...para)).toBe(ret)
  }
})

test('uniquer.gen_key', () => {
  const u = New()

  const tb = [
    ['a', 'a', 'k1'],
    ['a_0', 'a', 'k2'],
    ['a_1', 'a', 'k3'],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(u.gen(...para)).toBe(ret)
  }
  
  expect(u.get('k2')).toBe('a_0')

})
