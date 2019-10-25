/*
 * 对对象和数组的深度map
 */
import {map} from 'ramda'
import _ from 'lodash'

export default function deepMap(obj, fn, keys = []) {
  /*
   * fn(v, [...keys])
   * 先根遍历
   */
  const newObj = fn(obj, keys)
  if ( !_.isObject(newObj) ) {
    return newObj
  }

  return map((v,k)=>{
    return deepMap(v, fn, [...keys, k])
  }, newObj)
}
