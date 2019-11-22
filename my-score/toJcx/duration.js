/*
 * 将duration转成字符串
 */
import {format} from 'mathjs'

export default function make(d) {
  d = format(d)
  if ( /^1$|^1\//.test(d) ) { // 省略分子1
    d = d.slice(1)
  } 

  if ( /\/1$/.test(d) ) {  // 省略分母1
    d = d.slice(0, -2)
  } 

  return d
}
