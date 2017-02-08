import {str_display_cut, str_ellipsis} from './modash.js'

test('hello world', () => { 
  // 初探jest的用法，此处并无实际测试内容
  // console.log("haha")
})

const str1 = '我Abd哈-。2'

test('str_display_cut', () => {
  const tb = [
    [ '我Ab', str1, 4, ],
    [ '我A×', '我A×d哈-。2', 4, ], // 超出1单位的用例
    // 后面可能考虑补充一些特殊字符
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(str_display_cut(...para)).toBe(ret)
  }
})

test('str_ellipsis', () => {
  const tb = [
    [
      '我Ab…', str1, 6, // postfix缺省的情况
    ],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(str_ellipsis(...para)).toBe(ret)
  }
})

