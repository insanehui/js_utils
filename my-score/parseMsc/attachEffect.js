/*
 * 添加扫弦等效果
 */
import _ from 'lodash'
import process from '../../modash/deepProcess.js'
import chunkReduce from '../../modash/chunkReduce.js'
import {isPCValue} from '../predicates.js'

export default function attachEffect(t) {
  t = process(t, x=>chunkReduce(
    x,
    (s, a)=>{
      if ( !['^', 'v'].includes(a) ) {
        return false
      } 
      return {
        ...s,
        stroke : a,
      }
    }
  ), isPCValue, _.isArray, true)
  return t
}
