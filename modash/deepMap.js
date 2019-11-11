/*
 * 对对象和数组的深度map
 */
import _ from 'lodash'

export default function deepMap(x, fn, predicate = a=>true, keys = [], global = x) {
  /*
   * fn(v, [...keys])
   * TODO: 有需要可以考虑fn加一个global参数
   * 先根遍历
   */
  let newX = x
  if ( predicate(x, keys, global) ) {
    newX = fn(x, keys)
  } 

  if ( _.isFunction(newX) ) { // 如果是函数，调用后返回
    return newX()
  } 

  if ( !_.isObject(newX) ) { // 如果不能map，直接返回
    return newX
  }

  let map = _.isArray(newX) ? _.map : _.mapValues

  // 递归
  return map(newX, (v,k)=>{
    return deepMap(v, fn, predicate, [...keys, k], global)
  })
}
