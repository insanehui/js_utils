/*
 * 将一个音符的字符串解析成数据结构
 */
import _ from 'lodash'
import reg from './noteRxp.js'

export default function parseNote(s) {
  const exec = reg.exec(s)
  if ( !exec ) {
    return null
  } 

  const [,sign, note, octave, string, tie] = exec
  // console.log('str, sign, note, octave, tie', str, sign, note, octave, tie)

  const res = {
    type : 'note',
    octave : (_.includes(octave, '.')?-1:1)*_.size(octave), 
    sign, // 升降号
    ...(string && {string : +string.slice(1)}),
    note: note || tie,
  }

  return res
}
