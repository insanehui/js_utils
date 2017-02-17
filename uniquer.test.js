import {New} from './uniquer.js'

test('uniquer.gen', () => {
  const u = New()

  const tb = [
    ['a', 'a'],// 第一个值是返回，后面是参数系列
    ['a_0', 'a'],
    ['a_1', 'a'],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(u.gen(...para)).toBe(ret)
  }
})
