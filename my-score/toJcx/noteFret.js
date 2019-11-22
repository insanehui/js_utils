/*
 * 计算出一个note.fret
 */
import scale from './noteScale.js'

function makeNote(note, octave, sign) {
  return {
    note,
    octave,
    sign
  }
}

// note的一个值
function count(n) {
  const {sign, note, octave} = n
  return scale[(sign || '')+note]+ 12*octave
}

function sub(a, b) {
  return count(a) - count(b)
}

const tuning = [
  null,
  [3,1],
  [7,0],
  [5,0],
  [2,0],
  [6,-1],
  [3,-1],
]

export default function noteFret(n) {
  const {string, note} = n
  if ( note === '-' || note === '0' ) { // 注意休止符
    return n
  } 
  let res
  if ( string ) {
    res = {
      ...n,
      fret : sub(n, makeNote(...tuning[string])),
    }
    return res
  } 

  // 算一下离哪个最近，从高到低
  for(let i = 1; i<tuning.length; i++) {
    const fret = sub(n, makeNote(...tuning[i]))
    if ( fret >= 0 ) {
      return {
        ...n,
        string : i,
        fret,
      }
    }
  }
}
