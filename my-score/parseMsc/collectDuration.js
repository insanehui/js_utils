/*
 * 合并时值
 */
import {add} from 'mathjs'
import process from '../../modash/deepProcess.js'
import chunkReduce from '../../modash/chunkReduce.js'

import {isPCValue} from '../predicates.js'


// 合并同类音符
function noteAdd(a, b) {
  /*
   * 这里要特别考虑跨小节的连音线
   */
  // 不能合并，直接返回false
  if ( b.note !== '-' ) {
    return false
  } 

  // 以a的为准
  return {
    ...a,
    duration : add(a.duration, b.duration),
  }
}

export default function collect(t) {
  t = process(t, x=>chunkReduce(x, noteAdd), isPCValue)
  return t
}
