/* 对lodash的一些补充 */
import _ from 'lodash'

function _ungroup(o, keys, p){ // ungroup的递归主体
  // 这是一个递归函数，之前在cdb团队写过c++版的json_ungroup，后来代码遗失，今天重新梳理 2016年12月21日
  // 这里o是一个对象，keys为还剩下需要ungroup的序列，为数组，p为已经积累的需要合并的数据

  if ( !_.isObject(o) ) {
    return [] // 始终返回为一个数组，行为统一，便于递归
  }

  // 已经结束
  if ( !_.size(keys) ) {
    return [{...o, ...p}] 
  } 

  // 进入递归
  // 取出keys第一个元素
  const [key, ...rest] = keys
  let arr = []
  _.each(o, (v, k ) => {
    arr = [...arr, ..._ungroup(v, rest, {...p, [key]:k})]
  })

  return arr
}

// 经典ungroup
export function ungroup(o, ...keys){
  return _ungroup(o, keys, {})
}

// 经典group
export function group(o, [...by], {...opt}){
  let ret = {}

  const {strip, array} = opt // 缺省不strip，并且保留obj形式
  _.each(o, item => { // 遍历数据集
    let cursor = ret // 游标指针

    _.each(by, (key, i) => { // 遍历by
      let val = item[key] // 取到item的值
      if ( i < by.length - 1 ) { // 如果还没到达叶子
        // 移动指针. TODO: 后面把这里闭包化

        if ( !(val in cursor ) ) {
          cursor[val] = {}
        } 
        cursor = cursor[val]
      } else { // 已经到了叶子，直接赋值
        const leaf = strip ? _.omit(item, by) : item
        cursor[val] = array ? [ ...(cursor[val] || []), leaf ] : leaf
      }
    })
  })
  return ret
}

function _traverse(obj, fn, depth, pre){ // 递归主体. 深度遍历一个对象，可以指定深度级别
  /*
   * obj: 为当前的对象，而非根对象。目的一是提高效率，二是体现更纯粹的递归思想
   * depth表示还要进入的深度，0表示结束递归，利用这一点，填负数（如-1）可以进行完全深度遍历！
   * fn(val, [...path])
   * pre表示前辈已经走了的路径, 如['a', 'b']
   */

  if ( depth === 0 || !_.isObject(obj) ) { // 已不需要再深入或者无法再深入，结束递归
    fn(obj, pre)
    return
  } 

  // 递归深入
  for( const key in obj )
  {
    _traverse(obj[key], fn, depth-1, [...pre, key])
  }

}

export function traverse(obj, fn, depth = 1){
  _traverse(obj, fn, depth, [])
}

export function test(){
  console.log('test!!', [1, ...null])
}

export function test_ungroup(){
  // 原始数据
  const from = {
    a : {
      a1 : { 
        val : 1 
      }, 
      a2 : { 
        val : 2,
      }, 
    },
    b : {
      b1 : { 
        val : 3,
      }, 
      b2 : { 
        val : 4,
      }, 
    },
  }

  // 最终期望替换成
  const to = [
      { 
        key1: 'a',
        key2: 'a1',
        val : 1,
      }, 
      { 
        key1: 'a',
        key2: 'a2',
        val : 2,
      }, 
      { 
        key1: 'b',
        key2: 'b1',
        val : 3,
      }, 
      { 
        key1: 'b',
        key2: 'b2',
        val : 4,
      }, 
  ]

  const r = ungroup(from, 'key1', 'key2')
  console.log(_.isEqual(r, to) )

}

// 将arr以值为分割，截成2段，返回新数组，形如：[ before, after ]，不包括v
function arrCut(arr, v) { 
  const i = _.indexOf(arr, v)
  if ( i === -1 ) {
    return null
  } 

  const before = _.slice(arr, 0, i)
  const after = _.slice(arr, i+1)
  return [before, after]
}

// 字符串的显示长度
export function str_display_len(str){
  let l = 0 // 返回的长度
  for (let c of str) {
    l += c.codePointAt(0) > 256 ? 2 : 1
  }
  return l
}

// 将字符串以显示的长度分割，非英文占两个长度，最终长度可能会超出1个单位
export function str_display_cut(str, len){
  let r = ''
  let l = 0 // 当前的长度
  for (let c of str) {
    r += c
    l += c.codePointAt(0) > 256 ? 2 : 1
    if ( l >= len ) {
      break
    } 
    // console.log(c);
  }
  return r
}

// 类似str_display_cut，但会根据情况增加省略号
export function str_ellipsis(str, len, postfix = '…'){
  if ( str_display_len(str) <= len ) {
    return str
  } 

  return str_display_cut(str, len - str_display_len(postfix)) + postfix
}

export function test_arrCut(){
  const t = [ 2, 8, 3, 9, 7, 0, 5, 6 ]
  console.log("cut: ", arrCut(t, 9))
}

export function logify(func){ // 令一个函数可以打参数和返回日志的高阶函数

  const begin = console.groupCollapsed ? console.groupCollapsed.bind(console) : console.log.bind(console)
  const end = console.groupEnd ? console.groupEnd.bind(console) : _.noop

  return (...para) => {
    begin(`=== ${func.name} called ===`)
    console.log("arguments: ", para)
    const ret = func(...para)
    console.log("return: ", ret)
    end()
    return ret
  }
}

export function local_uid(){ // 返回字符串。唯一性只对当前页面有效
  // 暂时没用到，用到时，再弄了
}
