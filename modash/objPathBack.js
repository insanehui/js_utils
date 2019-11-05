/*
 * 用于一个对象路径的回溯
 */
import _ from 'lodash'

export default function back(g, keys, lvl = 1) {
  return _.get(g, keys.slice(0, -lvl))
}

