import _ from 'lodash'
import goBack from '../modash/objPathBack.js'

export const is = (name, up=0) => (v,keys,g)=>{
  return _.get(goBack(g, keys, up), 'type') === name
}

export const isValueOf = name =>(v, keys, g)=>{
  return _.get(goBack(g, keys), 'type') === name && _.last(keys) === 'value'
}

export const isProp = name =>(v, keys, g)=>{
  return  _.last(keys) === name
}

export const isLvl = n =>(v, keys, g)=>{
  return  keys.length === n
}


export const back = (by=1) => (v, keys, g)=>{
  return goBack(g, keys, by)
}

export function or(...paras) { // or的fp工具
  return (...x)=>_.some(_.map(paras, para=>para(...x)))
}

export function and(...paras) { // or的fp工具
  return (...x)=>_.every(_.map(paras, para=>para(...x)))
}

export function not(fn) {
  return (...x)=>(!fn(...x))
}

export const isPCValue = or(isValueOf('piece'), isValueOf('chord'))
