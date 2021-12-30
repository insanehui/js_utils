/*
 * deepMap的重构版，旨在简化代码以及业务逻辑
 * 主要改动：
 * > 通过pred的lift来判断是否，而不是通过fn
 * > deny 和 shallow 感觉用得少，先不写进去
 * 便于实现回溯的流程: 比如，给每个节点都分发一个 __back 属性，这样可以实现任意回溯 
 * 
 */
import _ from 'lodash'

export default function dMap(x, fn, predicate = a=>true, keys = []) {
  /*
   * 先根遍历
   */
  let newX = x

  const pred = predicate(x) 

  if (pred) {
    newX = fn(x, keys, pred)
    /*
     * ! 这里和deepMap的逻辑相反 !!
     * 默认不继续深入，遇到函数才深入
     */
    if ( _.isFunction(newX) ) { 
      newX = newX()
    } 
    else {
      return newX // 直接返回
    }
  } 


  if ( !_.isObject(newX) ) { 
    return newX
  }

  // 深入下面的节点，进入递归
  let map = _.isArray(newX) ? _.map : _.mapValues

  return map(newX, (v,k)=>{
    if ( k === '__p' ) { // 预留的指向上一级的字段
      return v
    } 
    return dMap(v, fn, predicate, [...keys, k])
  })
}

