import _ from 'lodash'
import nester from '../../modash/nester.js'
import process from '../../modash/deepProcess.js'

import {or, and, isValueOf} from '../predicates.js'
import compact from './compact.js'

export default function parseBrackets(obj) {
  obj = process(obj, 
    x=>nester(x), // 注意这里不能直接传 nester，因为有缺省参数
    and(or(isValueOf('chord'), isValueOf('piece')), _.isString),
  )
  obj = compact(obj)
  return obj
}
