/*
 * deepProcess的重构版
 * 废弃了through的选项，因为按设置的逻辑dProc不应该需要该选项
 *
 * 使用到了dMap，但dMap的key参数被退化掉
 */
// import _ from 'lodash'
import dMap from './dMap.js'

/*
 * fn(v, keys, [...trace]) trace是每次pred的结果
 */
export default function process(obj, fn, [...preds], keys = [], trace = []) {

  const pred = preds.shift()

  if ( !preds.length ) {
    return dMap(obj, fn, x=>{
      /*
       * 注意：这里的pred支持3个参数，而dMap的pred函数暂时只支持一个参数（先不开放）
       */
      let p = pred(x, keys, trace) 
      p = (p && [...trace, p])
      return p
    }, keys)
  } 

  // 进入递归
  return dMap(obj, (v,k,p)=>{
    return process(v, fn, preds, k, [p]) // 这里p要加[]，因为dMap的pred不会堆叠
  }, 
    pred, 
    keys
  )
}
