/*
 * 从小节到tracks
 */
import program from '../../modash/deepProgram.js'
import {is, isValueOf,} from '../predicates.js'

import setLine from './setLine.js'

const join = a=>a.join('')

export default function barsToTrack(obj) {
  obj = program(obj,
    [join, isValueOf('bar')],
    [x=>x.value + '|', is('bar')],
    [setLine, is('line')],
    [x=>x.join('\n')]
  )
  return obj
}
