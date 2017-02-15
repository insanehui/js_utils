/* 对lodash的一些补充 */
import _ from 'lodash'

// 内部基础函数
function _ungroup(o, keys, p){
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

export function local_uid(){ // 返回字符串。唯一性只对当前页面有效
  // 暂时没用到，用到时，再弄了
}
