// 用于生成uuid，支持用户传入候选值

// 引用计数器
import _ from 'lodash'
import {_count, scount} from './counter.js'

let s = new Set([undefined]) // 用于下文判断方便，预存一个undefined

export function gen(val){
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

// 常用于将集合初始化的场合
export function add(val){
  if ( _.isArray(val) ) {
    for(let i of val){
      s.add(i)
    }
  } else {
    s.add(val)
  }
}
