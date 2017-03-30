/*
 * 根据query string参数来判断是否打console日志
 * 注：该模块是有副作用的！会改变console对象，谨慎使用!!
 */

import {para} from './query_string_para.js'

const {_CONSOLE_DEBUG_}  = para

const meth_names = [
  'log', 
  'info', 
  'group', 
  'groupCollapsed', 
  'groupEnd', 
]

for (const name of meth_names) { 
  if ( !console[name] ) {
    continue
  } 

  const meth = console[name].bind(console)

  console[name] = (...p)=>{
    if ( _CONSOLE_DEBUG_ ) {
      meth(...p)
    } 
  }
}
