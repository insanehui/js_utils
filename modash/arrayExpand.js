/*
 * 把数组按一定的规则分裂扩大
 */
import _ from 'lodash'

export default function expand(a, fnMap, fnOp) {
  const res = []
  for (const item of a) {
    const map = fnMap(item)
    if ( _.isFunction(fnOp) ) {
      const op = fnOp(item)
      if ( op === 'expand' ) {
        res = [...res, ...map]
      } else if ( op === 'keep' ) {
        res = [...res, map]
      } else if ( op === 'remove' ) {
        // 直接删除
      } 
    } 
    else if (fnOp === true) { // 规则1
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
