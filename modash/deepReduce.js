/*
 * 将符合条件的元素reduce
 * 比如要汇总store里满足某些条件的结点的信息
 */
import _ from 'lodash'
import deepProcess from './deepProcess.js'

export default function deepReduce(x, fn, predicate = a=>true, keys = [], global = x) {
  const arr = []
  function proc(x) { arr.push(x) }
  deepProcess(x, proc, predicate, true)
  return _.reduce(arr, fn)
}
