/*
 * deepMap的重构版，旨在简化代码以及业务逻辑
 * 便于实现回溯的流程: 比如，给每个节点都分发一个 __back 属性，这样可以实现任意回溯 
 *
 *
 * deny 和 shallow 感觉用得少，先不写进去
 */
import _ from 'lodash'

export default function deepMap(x, fn, predicate = a=>true, keys = []) {
  /*
   * 先根遍历
   */
  let newX = x

  const pred = predicate(x) 

  // if ( pred === 'deny' ) { return newX } // 暂时不考虑deny的情景

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


  if ( !_.isObject(newX) /*|| pred === 'shallow'*/  ) { 
    return newX
  }

  // 深入下面的节点，进入递归
  let map = _.isArray(newX) ? _.map : _.mapValues

  return map(newX, (v,k)=>{
    return deepMap(v, fn, predicate, [...keys, k])
  })
}
