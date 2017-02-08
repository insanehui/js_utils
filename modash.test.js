import {str_display_cut} from './modash.js'

test('hello world', () => { 
  // 初探jest的用法，此处并无实际测试内容
  // console.log("haha")
})

test('str_display_cut', () => {
  const tb = [
    [ '我Ab', '我Abd哈-。2', 4, ],
    [ '我A×', '我A×d哈-。2', 4, ], // 超出1单位的用例
    // 后面可能考虑补充一些特殊字符
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(str_display_cut(...para)).toBe(ret)
  }
})
