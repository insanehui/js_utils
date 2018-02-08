/*
 * 可以在一定的深度下对对象进行each
 * 用法：
 * depthEach(collection, 3, (val, key)=>{ // 3表示层次是3，key是[a,b,..]这样的形式
 * })
 */
import _ from 'lodash'

function _each_(data, depth, fn, pre = []){
  if ( depth === 0 ) {
    fn(data, pre)
    return
  } 
  // 进入递归
  _.each(data, (val, key)=>{
    _each_(val, depth-1, fn, [...pre, key])
  })
}

export function depthEach(data, depth, fn){
  return _each_(data, depth, fn)
}
