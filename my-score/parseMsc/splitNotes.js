/*
 * 将音符分开
 */
import _ from 'lodash'
import {arrayExpand} from '../../modash/arrayExpand.js'
import process from '../../modash/deepProcess.js'
import splitMap from '../../modash/splitMap.js'

import {isValueOf, or} from '../predicates.js'

import reg from './noteRxp.js'

function split(s) {
  return splitMap(s, reg, a=>a)
}

export default function splitNote(t) {
  t = process(t, x=>arrayExpand(x,
    split, _.isString,
  ), or(isValueOf('chord'), isValueOf('piece')), _.isArray, true)
  t = process(t, split, isValueOf('harmony'))
  return t
}
