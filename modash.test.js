import {str_display_cut, str_ellipsis, group} from './modash.js'

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

test('group', () => {
  const tb = [
    // 第一个值是返回，后面是参数系列
    [ // 缺省: obj, nostrip
      {
        "1" : {
          "2" :  {"a": 1, "b": 2, "v": 2},
          "3" : {"a": 1, "b": 3, "v": 2},
        },
        "2" : {
          '4' : {"a": 2, "b": 4, "v": 3},
        },
      },
      [
        {"a": 1, "b": 2, "v": 1},
        {"a": 1, "b": 2, "v": 2},
        {"a": 1, "b": 3, "v": 2},
        {"a": 2, "b": 4, "v": 3},
      ],
      ['a', 'b'],
    ],
    [ // array, nostrip 
      {
        "1" : {
          "2" :  [{"a": 1, "b": 2, "v": 1},{"a": 1, "b": 2, "v": 2},],
          "3" : [{"a": 1, "b": 3, "v": 2},],
        },
        "2" : {
          '4' : [{"a": 2, "b": 4, "v": 3},],
        },
      },
      [
        {"a": 1, "b": 2, "v": 1},
        {"a": 1, "b": 2, "v": 2},
        {"a": 1, "b": 3, "v": 2},
        {"a": 2, "b": 4, "v": 3},
      ],
      ['a', 'b'],
      {array: true},
    ],
  ]

  for (let i of tb) {
    let [ret, ...para ] = i
    expect(group(...para)).toEqual(ret)
  }
})

