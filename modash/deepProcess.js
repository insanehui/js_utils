/*
 * deepMap的进一步封装。为deepMap的使用场景提供便利
 * 可以实现多重条件筛选. 并且默认为不through，而deepMap默认为through
 */
// import _ from 'lodash'
import deepMap from './deepMap.js'
import lift from './funcOrderLift.js'

/*
 * 采用省略参数的写法，在参数处理上的逻辑就显得复杂很多
 * 但使用起来就会方便一点
 */
export default function process(obj, fn, ...preds) {

  // 先将preds降一级
  let pred = preds.pop()
  let through = false

  // 根据情况调整一下，因为可能preds可能包含了最后一个参数
  if ( pred === true || pred === false) {
    through = pred
    pred = preds.pop()
  } 

  // 用deepMap吸纳pred，取代降维后的新fn（或者是proc）
  const proc = v=>deepMap(v, through ? fn : lift(fn), pred)

  if ( !preds.length ) {
    return proc(obj) // 如果已经降维到尽头，直接返回
  } 

  // 进入降维递归
  return process(obj, proc, ...preds, through)
}

// 最新版，可以传递一些keys的信息，但是参数变多了
export function process2(obj, fn, ...preds) {

  // 先将preds降一级
  let pred = preds.pop()
  let through = false
  let keys = []
  let global = obj

  // 根据情况调整一下，因为可能preds可能包含了最后一个参数
  if ( pred === true || pred === false) {
    through = pred
    global = preds.pop()
    keys = preds.pop()
    pred = preds.pop()
  } 

  // 用deepMap吸纳pred，取代降维后的新fn（或者是proc）
  const proc = (v, p, keys, o)=>deepMap(v, through ? fn : lift(fn), pred, keys, obj)

  if ( !preds.length ) {
    return proc(obj, null, keys, global) // 如果已经降维到尽头，直接返回
  } 

  // 进入降维递归
  return process2(obj, proc, ...preds, keys, global, through)
}
