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

// 导出函数
export function ungroup(o, ...keys){
  return _ungroup(o, keys, {})
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

export function test_arrCut(){
  const t = [ 2, 8, 3, 9, 7, 0, 5, 6 ]
  console.log("cut: ", arrCut(t, 9))
}

export function local_uid(){ // 返回字符串。唯一性只对当前页面有效
  // 暂时没用到，用到时，再弄了
}
