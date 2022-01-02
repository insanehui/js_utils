/*
 * deepProcess的重构版
 * 废弃了through的选项，因为按设置的逻辑dProc不应该需要该选项
 *
 * 使用到了dMap，但dMap的key参数被退化掉
 */
import _ from 'lodash'
import dMap from './dMap.js'

export function or(...paras) { // or的fp工具
  return (...x)=>_.some(_.map(paras, para=>para(...x)))
}

export function and(...paras) { // or的fp工具
  return (...x)=>_.every(_.map(paras, para=>para(...x)))
}

export function not(fn) {
  return (...x)=>(!fn(...x))
}

export function dPrepare(t){
  if ( !_.isObject(t) ) {
    return
  } 
  _.mapValues(t, v => {
    if ( _.isObject(v) ) {
      Object.defineProperty(v, '__p', {value:t})
      dPrepare(v)
    } 
  })  
}

/*
 * 要求数据已经被prepare过
 */
export const isValueOf = (...names)=>(v,keys)=>{
  if ( !(_.last(keys) === 'value' ) ) {
    return false
  } 
  let res
  const type = _.get(v, '__p.type')
  if ( names.includes(type) ) {
    res = 'isValueOf_' + type
    return res
  } 
}

/*
 * fn(v, keys, [...trace]) trace是每次pred的结果
 */
export default function process(obj, fn, ...preds) {

  let trace = [], keys = []
  if ( _.isArray(_.last(preds)) ) {
    trace = preds.pop()
    keys = preds.pop()
  } 

  const pred0 = preds.shift()
  const pred = (x,k)=>{
    /*
     * 注意：这里的pred支持3个参数，而dMap的pred函数暂时只支持一个参数（先不开放）
     */
    let p = pred0(x, k, trace) 
    p = (p && [...trace, p])
    return p
  }

  if ( !preds.length ) {
    return dMap(obj, fn, pred, keys)
  } 

  // 进入递归
  return dMap(obj, (v,k,p)=>{
    return process(v, fn, ...preds, k, [p]) // 这里p要加[]，因为dMap的pred不会堆叠
  }, 
    pred, 
    keys
  )
}
