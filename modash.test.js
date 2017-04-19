import {str_display_cut, str_ellipsis, group,
  logify,
  traverse, 
  traverse_all, 
  partial_order,
  wash, 
} from './modash.js'
import _ from 'lodash'

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

test('traverse', () => {

  let fact = []

  const tb = [
    [ // 完全递归
      {
        "1" : {
          "2" :  {"a": 1, "b": 2, "v": 2},
          "3" : {"a": 1, "b": 3, "v": 2},
        },
        "2" : {
          '4' : {"a": 2, "b": 4, "v": 3},
        },
      }, 
      (x, p)=>{
        fact.push([p, x])
      },
      -1,
      [
        [[ '1', '2', 'a' ],1,],
        [[ '1', '2', 'b' ],2,],
        [[ '1', '2', 'v' ],2,],
        [[ '1', '3', 'a' ],1,],
        [[ '1', '3', 'b' ],3,],
        [[ '1', '3', 'v' ],2,],
        [[ '2', '4', 'a' ],2,],
        [[ '2', '4', 'b' ],4,],
        [[ '2', '4', 'v' ],3,],
      ],
    ],
    [ // 递归深度缺省
      {
        "1" : {
          "2" :  {"a": 1, "b": 2, "v": 2},
          "3" : {"a": 1, "b": 3, "v": 2},
        },
        "2" : {
          '4' : {"a": 2, "b": 4, "v": 3},
        },
      }, 
      (x, p)=>{
        fact.push([p, x])
      },
      [
        [[ '1', ], {
          "2" :  {"a": 1, "b": 2, "v": 2},
          "3" : {"a": 1, "b": 3, "v": 2},
        },],
        [[ '2', ],{
          '4' : {"a": 2, "b": 4, "v": 3},
        },],
      ],
    ],
    [ // 递归深度为0，是其自身
      {
        "1" : {
          "2" :  {"a": 1, "b": 2, "v": 2},
          "3" : {"a": 1, "b": 3, "v": 2},
        },
        "2" : {
          '4' : {"a": 2, "b": 4, "v": 3},
        },
      }, 
      (x, p)=>{
        fact.push([p, x])
      },
      0,
      [
        [[], {
          "1" : {
            "2" :  {"a": 1, "b": 2, "v": 2},
            "3" : {"a": 1, "b": 3, "v": 2},
          },
          "2" : {
            '4' : {"a": 2, "b": 4, "v": 3},
          },
        }, ]
      ],
    ],
    [ // 递归到中间深度，并且一部分到不了该深度
      {
        "1" : {
          "2" :  'hello',
          "3" : 'world',
        },
        "2" : 'haha',
      }, 
      (x, p)=>{
        fact.push([p, x])
      },
      2,
      [
        [[ '1', '2', ], 'hello',],
        [[ '1', '3', ], 'world',],
        [[ '2', ], 'haha',],
      ],
    ],
  ]

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    fact = [] // 清空fact
    traverse(...para)
    expect(fact).toEqual(hope)
  }
})

test('traverse_all', () => {
  const tb = [
    [  // 支持 _.property shortcut, true
      {
        a : {
          x : {
            x : 1
          }, 
        },
        "1" : {
          "3" : {
            x: '0'
          },
        },
        "2" : {
          "8" : {
            x: _.noop
          },
          "3" : {
            x: {}
          },
        },
      }, 
      'x',
      2,
      true,
    ],
    [  // 支持shortcut, false
      {
        a : {
          x : {
            x : 1
          }, 
        },
        "1" : {
          "3" : {
            x: '0'
          },
        },
        "2" : {
          "8" : {
            x: _.noop()
          },
          "3" : {
            x: {}
          },
        },
      }, 
      'x',
      2,
      false,
    ],
    [  // true的情况
      {
        a : {
          x : {
            x : 1
          }, 
        },
        "1" : {
          "3" : {
            x: '0'
          },
        },
        "2" : {
          "8" : {
            x: _.noop
          },
          "3" : {
            x: {}
          },
        },
      }, 
      _.property('x'),
      2,
      true,
    ],
    [  // 少了一级，为false
      {
        a : {
          x : 1, 
        },
        "1" : {
          "3" : {
            x: 1
          },
        },
        "2" : {
          "8" : {
            x: 1
          },
          "3" : {
            x: 1
          },
        },
      }, 
      _.property('x'),
      2,
      false,
    ],
  ]

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    const fact = traverse_all(...para)

    expect(fact).toBe(hope)
  }
})

xit('logify', () => {

  function i_am_a_func(a, b, c, d){
    return a + b + c + d
  }

  const tb = [
    [
      i_am_a_func, null,
    ],
  ]

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    const fact = logify(...para)

    fact(1, 2, 3, 4)
  }
})

test('partial_order', () => {
  const tb = [
    [
      [
        ['rabbitmq', 'shipping'],
        ['usersvc', 'front-end'],
        ['catalogsvc', 'front-end'],
        ['cartsvc_0', 'front-end'],
      ], 
      [ 'rabbitmq',
      'shipping',
      'usersvc',
      'catalogsvc',
      'cartsvc_0',
      'front-end' ],
    ],
    [
      [
        ['rabbitmq', 'shipping'],
        ['usersvc', 'front-end'],
        ['catalogsvc', 'front-end'],
        ['cartsvc_0', 'front-end'],
        ['orderssvc_1', 'front-end'],
        ['payment', 'orderssvc_1'],
        ['shipping', 'orderssvc_1'],
        ['zipkinsvc_2', 'usersvc'],
        ['zipkinsvc_2', 'catalogsvc'],
        ['zipkinsvc_2', 'cartsvc_0'],
        ['zipkinsvc_2', 'payment'],
        ['zipkinsvc_2', 'shipping'],
        ['zipkinsvc_2', 'orderssvc_1'],
        ['extsvc', 'front-end'],
      ], 
      [ 'rabbitmq',
      'zipkinsvc_2',
      'shipping',
      'usersvc',
      'catalogsvc',
      'cartsvc_0',
      'payment',
      'orderssvc_1',
      'extsvc',
      'front-end' ],
    ],
  ]

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    const fact = partial_order(...para)

    if ( hope ) {
      expect(fact).toEqual(hope)
    } 
    else {
      console.log("fact:", fact)
    }
  }
})

test('wash', () => {
  const tb = [
    [undefined, undefined], // 对于undefined能正常处理
  ]

  for (let i of tb) {
    const para = _.initial(i)
    const hope = _.last(i)
    const fact = wash(...para)

    expect(fact).toBe(hope)
  }
})
