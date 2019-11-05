/*
 * deepMap的进一步封装。为deepMap的使用场景提供便利
 */
import deepMap from './deepMap.js'
import lift from './funcOrderLift.js'

/*
 * 采用省略参数的写法，在参数处理上的逻辑就显得复杂很多
 * 但使用起来就会方便一点
 */
export default function process(obj, fn, ...preds) {
  let pred = preds.pop()
  let through = false
  if ( pred === true || pred === false) {
    through = pred
    pred = preds.pop()
  } 

  const func = through ? fn : lift(fn)

  if ( !preds.length ) {
    return deepMap(obj, func, pred)
  } 
  const high = v=>deepMap(v, func, pred)
  return process(obj, high, ...preds, through)
}
