/*
 * 用于一个对象路径的回溯
 */
import _ from 'lodash'

export default function back(g, keys, lvl = 1) {
  keys = keys.slice(0, lvl ? -lvl : undefined)
  if (_.isEmpty(keys)) {
    return g
  } 
  return _.get(g, keys)
}

