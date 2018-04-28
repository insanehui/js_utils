/*
 * 用于forward dom的一些属性
 */
import _ from 'lodash'
import names from './enumEvents/index.js'

export function events(p){
  return _.pick(p, names)
}
