/*
 * compact掉一些空字符串
 */
import _ from 'lodash'
import process from '../../modash/deepProcess.js'

export default function compact(t) {
  t = process(t, _.compact, _.isArray, true)
  return t
}
