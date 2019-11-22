/*
 * 分离和声表示
 */
import _ from 'lodash'
import nester from '../../modash/nester.js'
import process from '../../modash/deepProcess.js'

import {isValueOf, or} from '../predicates.js'

import compact from './compact.js'

export default function parseHarmony(obj) {
  obj = process(obj, x=>nester(x, '[', ']', 'harmony'), 
    or(isValueOf('piece'), isValueOf('chord')),
    _.isString,
  )

  obj = process(obj, x=>({type : 'harmony', value:x[0]}),
    or(isValueOf('piece'), isValueOf('chord')),
    x=>_.get(x, 'nesterName') === 'harmony',
  )

  obj = compact(obj)
  return obj
}
