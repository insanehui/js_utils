
import {pinyin} from './pinyin.js'

test('pinyin', () => {
  const tb = [
     // 第一个值是返回，后面是参数系列
    ['NiShiShui', '你是谁'],
    ['haNi0Shi-Shui', 'ha你0是-谁'],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(pinyin(...para)).toBe(ret)
  }
})

