// 用于生成uuid，支持用户传入候选值

// 引用计数器
import {_count, scount} from './counter.js'

let s = new Set([undefined]) // 用于下文判断方便，预存一个undefined

export function uniquer(val){
  while ( s.has(val) ) {
    if ( val === undefined ) {
      val = scount()
    } else {
      val += _count()
    }
  } 
  s.add(val)
  return val
}
