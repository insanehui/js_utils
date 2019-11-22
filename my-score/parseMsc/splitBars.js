/*
 * 分离小节, 小节以 | 分隔
 */
import _ from 'lodash'
import process from '../../modash/deepProcess.js'

import {isValueOf} from '../predicates.js'

function compact(a) {
  return _.compact(_.map(a, _.trim))
}

export default function splitBars(t) {
  t = process(t, x=>{
    return _.map(compact(x.split('|')),
      x=>({
        type : 'bar',
        value : x,
      }))
  }, isValueOf('line'))
  return t
}
