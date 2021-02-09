/*
 * 把数组按一定的规则分裂扩大。
 * 即把数组里面的某一些符合条件的元素进行分裂，再溶入到原数组里去
 * 举例子：有数组，[1, '23', 4]，如果我们希望变成[1,2,3,4]，就很适用该函数
 */
import _ from 'lodash'

export default function expand(a, fnMap, fnOp) {
  let res = []
  for (const item of a) {
    if ( _.isFunction(fnOp) ) {
      const op = fnOp(item)
      if ( op === 'expand' ) {
        res = [...res, ...fnMap(item)]
      }
      else if ( op === 'map' ) {
        res = [...res, fnMap(item)]
      }
      else if ( op === 'keep' ) {
        res = [...res, item]
      }
      else if ( op === 'remove' ) {
        // 直接删除
      } 
    } 
    else if (fnOp === true) { // 规则1
      const map = fnMap(item)
      if ( _.isArray(map) && map.expand === true ) {
        res = [...res, ...map]
      } 
      else if ( map !== undefined ) {
        res = [...res, map]
      } 
      else {
        // 如果是undefined，删除
      }
    } 
    else { // 规则2
      const map = fnMap(item)
      if ( _.isArray(map) ) {
        res = [...res, ...map]
      } 
      else if ( map !== undefined ) {
        res = [...res, map]
      } 
      else {
        // 如果是undefined，删除
      }
    } 
  }
  return res
}

// 简易版
export function arrayExpand(a, fnMap, fnOp) {
  let res = []
  for (const item of a) {
    const op = fnOp(item)
    if ( op ) {
      res = [...res, ...fnMap(item)]
    }
    else {
      res = [...res, item]
    } 
  }
  return res
}
