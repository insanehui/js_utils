// 用于生成uuid，支持用户传入候选值

// 引用计数器
import _ from 'lodash'

class Uniquer {

  s = new Set([undefined])

  m = {} // 用于查询

  constructor(sp = '_', idx0 = 0) { // 分隔符
    this.sp = sp
    this.i = idx0
  }
  
  gen(val, key) { // key为可选，用于后续查询，不能为falsy

    const s = this.s
    let ret = val
    let i = this.i
    if ( val === undefined ) {
      ret = i++
    } 

    while ( s.has(ret) ) {
      ret = (val || '') + (this.sp + i++)
    } 
    s.add(ret)

    // key的唯一性由使用者保证
    if ( key ) {
      this.m[key] = ret
    } 

    return ret
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

  clear(){
    this.s.clear()
    this.m = {}
  }

}

const def = new Uniquer()

export const add = def.add.bind(def)

export const gen = def.gen.bind(def)

export function New(...para){
  const inst =  new Uniquer(...para)

  const fn = function(...x){
    return inst.gen(...x)
  }

  _.extend(fn, inst)
  for(let i of Object.getOwnPropertyNames(inst.__proto__)) { // 这是一个偏方！
    fn[i] = inst[i] 
  }

  return fn
}

