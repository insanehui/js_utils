/*
 * deepMap的进一步封装。为deepMap的使用场景提供便利
 */
import deepMap from './deepMap.js'
import lift from './funcOrderLift.js'

export default function process(obj, fn, ...preds) {
  let pred = preds.pop()
  let through = false
  if ( pred === true ) {
    through = true
    pred = preds.pop()
  } 
  const func = through ? fn : lift(fn)

  if ( !preds.length ) {
    return deepMap(obj, func, pred)
  } 
  const high = v=>deepMap(v, lift(fn), pred)
  return process(obj, high, ...preds)
}
