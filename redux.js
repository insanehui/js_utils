/*
 * redux的一些工具
 */

import { connect as _connect } from 'react-redux'
import _ from 'lodash'

import {decorative} from './modash.js'
/*
 * 一个包装版的connect，传入一个对象取代原来的参数的目的是可以使用装饰器
 */
export const connect = ({s, d}) => Cmp => _connect(s, d)(Cmp)

/*
 * 用于redux的map store to props, 例
 * const sm = pick_store('aa', 'bb')(s=>{...原来的map store to props代码...})
 */
const pick_store = (...keys) => fn => s => {
  return {
    ..._.pick(s, keys),
    ...(fn && fn(s)),
  }
}

export const pick = (...props) => decorative(pick_store(...props))

/*
 * 生成直接对应action的方法，作为装饰器使用
 */
export const action = (...methods) => (t, n, desc) => {
  const {value:fn} = desc

  desc.value = d => {
    let obj = {}
    for (const method of methods) {
      obj[method] = para =>{
        return d({type : method, ...para})
      }
    }

    return {
      ...obj,
      ...(fn && fn(d)),
    }
  }
}

