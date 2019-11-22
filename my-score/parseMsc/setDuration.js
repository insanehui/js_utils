/*
 * 给数据加上duration字段
 */
import process from '../../modash/deepProcess.js'
import {is, isPCValue, or} from '../predicates.js'
import {fraction,} from 'mathjs'

export default function setDuration(t) {
  t = process(t, (v, pred, keys)=>{
    const l = keys.length
    let duration = fraction(1, 1<<(l-1))
    return {
      ...v,
      duration,
    }
  }, 
    isPCValue, 
    or(is('note'), is('harmony'), is('chordNote'))
  )
  return t
}

