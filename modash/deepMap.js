/*
 * TODO: 不再维护，新版见 <url:./dMap.js>
 * 后续准备重构一下，用来简化回溯的流程: 比如，给每个节点都分发一个 __back 属性，这样可以实现任意回溯 
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

  /*
   * pred返回deny跟返回false是有区别的：
   * deny比false更强，直接整个支线切断，不用继续深入递归
   * 而false只是不调用fn处理，目的上还是在深入进去寻找符合pred条件的子孙节点
   */
  if ( pred === 'deny' ) {
    return newX
  } 

  const back = (by=1)=>goBack(global, keys, by) 

  if (pred) {
    newX = fn(x, pred, keys, {
      back,

      // 一直追溯到符合条件的为止
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

  /*
   * 如果是函数，调用后返回。这样设计的用意是一旦出现满足条件的，
   * 当前路径就终止，不再深入处理了。默认情况下，会继续深入
   *
   * 或者通过pred来显式指定shallow，也能达到类似的效果
   */
  if ( _.isFunction(newX) ) { 
    return newX()
  } 

  if ( !_.isObject(newX) || pred === 'shallow'  ) { 
    return newX
  }

  let map = _.isArray(newX) ? _.map : _.mapValues

  /*
   * 递归。
   * 这里使用newX而不直接用x的用意是可以实现根节点经过转化处理之后
   * 在转化后的基础上，又进一步递归处理
   */
  return map(newX, (v,k)=>{
    return deepMap(v, fn, predicate, [...keys, k], global)
  })
}
