// 用于生成uuid，支持用户传入候选值

// 引用计数器
import _ from 'lodash'
import {_count, scount} from './counter.js'

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

const def = new Uniquer()

export const add = def.add.bind(def)

export const gen = def.gen.bind(def)

export function New(){
  return new Uniquer()
}
