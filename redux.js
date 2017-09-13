/*
 * redux的一些工具
 */

import { connect as _connect } from 'react-redux'
import _ from 'lodash'

import {decorative} from './modash.js'

// 一个包装版的connect，传入一个对象取代原来的参数的目的是可以使用装饰器
export const connect = ({s, d}) => Cmp => _connect(s, d)(Cmp)

// 用于redux的map store to props
const pick_store = (...keys) => fn => s => {
  /*
   * const sm = pick_store('aa', 'bb')(s=>{...原来的map store to props代码...})
   */
  return {
    ..._.pick(s, keys),
    ...(fn && fn(s)),
  }
}

export const pick = (...props) => decorative(pick_store(...props))


const inject_method = method_lib => fn => s => {
  /*
   * 用于将state_method里的方法注入到组件，例：
   * const sm = inject_method({method1, method2})(s=>{...})
   * 或者是
   * const dm = inject_method({method1, method2})(d=>{...})
   */
  return {
    ..._.mapValues(method_lib, method=>method(s)),
    ...(fn && fn(s)),
  }
}

export const method = method_lib => decorative(inject_method(method_lib))

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

