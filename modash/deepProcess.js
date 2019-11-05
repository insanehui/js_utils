/*
 * deepMap的进一步封装。为deepMap的使用场景提供便利
 */
import deepMap from './deepMap.js'
import lift from './funcOrderLift.js'

export default function process(obj, fn, ...preds) {
  const pred = preds.pop()
  if ( !preds.length ) {
    return deepMap(obj, lift(fn), pred)
  } 
  const high = v=>deepMap(v, lift(fn), pred)
  return process(obj, high, ...preds)
}
