/*
 * 对对象和数组的深度map
 * 支持通过predicate来控制路线
 */
import _ from 'lodash'

import goBack from './objPathBack.js'

export default function deepMap(x, fn, predicate = a=>true, keys = [], global = x) {
  /*
   * TODO: 有需要可以考虑fn加一个global参数
   * 先根遍历
   */
  let newX = x

  const pred = predicate(x, keys, global) 
  if ( pred === 'deny' ) {
    return newX
  } 

  const back = (by=1)=>goBack(global, keys, by) 

  if (pred) {
    newX = fn(x, pred, keys, {
      back,
      checkBack : pred=>{
        let p
        // eslint-disable-next-line
        for(let i = 1;p=back(i), p!==null;i++) {
          if ( pred(p) ) {
            return p
          } 
        }
        return false
      },
    })
  } 

  if ( _.isFunction(newX) ) { // 如果是函数，调用后返回
    return newX()
  } 

  if ( !_.isObject(newX) || pred === 'shallow'  ) { 
    return newX
  }

  let map = _.isArray(newX) ? _.map : _.mapValues

  // 递归
  return map(newX, (v,k)=>{
    return deepMap(v, fn, predicate, [...keys, k], global)
  })
}
