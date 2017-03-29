/*
 * 根据query string参数来判断是否打console日志
 * 注：该模块是有副作用的！会改变console对象，谨慎使用!!
 */

import {para} from './query_string_para.js'

const {_CONSOLE_LOG_}  = para

const b_log = console.log.bind(console)

console.log = (...p)=>{
  if ( _CONSOLE_LOG_ ) {
    b_log(...p)
  } 
}

