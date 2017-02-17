// 用于生成uuid，支持用户传入候选值

// 引用计数器
import _ from 'lodash'
import {_count, scount} from './counter.js'

// TODO: 既然已经定义了类，将这些逻辑重复的零散函数干掉
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

class Uniquer {

  s = new Set([undefined])
  
  gen(val) {
    const s = this.s
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

  add(val) {
    const s = this.s
    if ( _.isArray(val) ) {
      for(let i of val){
        s.add(i)
      }
    } else {
      s.add(val)
    }
  }
}

export function New(){
  return new Uniquer()
}
