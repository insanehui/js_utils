/*
 * 通常是将数组生成一个map，方便后续定位 
 * 常用于给数组注入一些数据的场景
 */
import _ from 'lodash'

export default function toMap(a, keyFun){
  const map = new Map()  
  if ( _.isString(keyFun) ) {
    keyFun = _.property(keyFun)
  } 

  _.each(a, (v, i)=>{
    map.set(keyFun(v, i), v)
  })
  return map
}
