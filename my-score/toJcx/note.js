/*
 * 将一个msc对象的note转为jcx形式
 */
import _ from 'lodash'

const noteTable = {
  '1' : 'C',
  '2' : 'D',
  '3' : 'E',
  '4' : 'F',
  '5' : 'G',
  '6' : 'A',
  '7' : 'B',
  '0' : 'Z',
}

export default function toNote(n) {
  const {note, octave, sign} = n

  const value = ({'#' : '^','b' : '_'}[sign] || '') + noteTable[note] + _.repeat(octave >= 0 ? '\'' : ',', Math.abs(octave))
  return {
    ...n,
    value,
  }
}
