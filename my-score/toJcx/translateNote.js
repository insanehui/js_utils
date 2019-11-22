/*
 * 将note translate一个值，fp风格的函数设计
 * 目前先按 b7的风格
 */
import scale from './noteScale.js'

const table = [
  [1],
  [1, '#'],
  [2],
  [2, '#'],
  [3],
  [4],
  [4, '#'],
  [5],
  [5, '#'],
  [6],
  [7, 'b'],
  [7],
]

const translateNote =  by => n => {
  let {note, sign, octave} = n
  // 找到在scale里的值
  let value = scale[(sign || '')+note]

  if ( value === undefined ) {
    return n
  } 

  value += by // 得到translate之后的scale值（半音值）

  let rest = value % 12
  let step = ~~(value / 12)
  if ( rest < 0 ) {
    step --
    rest += 12
  } 
  octave += step
  const [newNote, newSign] = table[rest]

  return {
    ...n,
    note : newNote,
    sign : newSign,
    octave,
  }
}

export default translateNote
