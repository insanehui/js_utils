// 用于生成uuid，支持用户传入候选值

// 引用计数器
import _ from 'lodash'
import {New as Counter} from './counter.js'

class Uniquer {

  c = Counter()

  s = new Set([undefined])

  m = {} // 用于查询

  constructor(sp = '_') { // 分隔符
    this.sp = sp
  }
  
  gen(val, key) { // key为可选，用于后续查询，不能为falsy

    const s = this.s
    while ( s.has(val) ) {
      if ( val === undefined ) {
        val = this.c.scount()
      } else {
        val += (this.sp + this.c.scount())
      }
    } 
    s.add(val)

    // key的唯一性由使用者保证
    if ( key ) {
      this.m[key] = val
    } 

    return val
  }

  add(val, key) { // key可选，用于查询
    const s = this.s
    if ( _.isArray(val) ) {
      for(let i of val){
        s.add(i) // array的形式，不支持key
      }
    } else {
      s.add(val)
      if ( key ) {
        this.m[key] = val
      } 
    }
  }

  get(key){
    return this.m[key]
  }

}

const def = new Uniquer()

export const add = def.add.bind(def)

export const gen = def.gen.bind(def)

export function New(sp){
  return new Uniquer(sp)
}

