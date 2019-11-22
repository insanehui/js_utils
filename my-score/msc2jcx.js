import _ from 'lodash'
import parseMsc from './parseMsc/main.js'
import toJcx from './toJcx/main.js'

export default _.flow(parseMsc, toJcx)

