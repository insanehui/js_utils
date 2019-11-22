/*
 * tab形式的track
 */
import _ from 'lodash'
// import copyJson from '../../debug/copyJson.js'
import process from '../../modash/deepProcess.js'
import setHarmony from './tabHarmony.js'
import setNote from './setTabNote.js'
import {is,or, isValueOf} from '../predicates.js'

import barsToTrack from './barsToTrack.js'
import translateNote from './translateNote.js'
import noteFret from './noteFret.js'

const strings = 'zabcdef'
const join = a=>a.join('')

export default function tabTrack(obj, name) {

  let t = obj.tracks[name].lines
  /*
   * 处理一下移调
   */
  const translate = _.get(obj, ['header', 'tracksObj', name, 'jcxObj', 'tab', 'translate'])
  if ( translate ) {
    t = process(t, translateNote(translate), is('note'))
  } 

  /*
   * 设置fret
   */
  t = process(t, noteFret, is('note'))

  /*
   * 将note转为字符串，赋到value属性
   */
  t = process(t, x=>{
    const {string, fret} = x
    return {
      ...x,
      value : string ? strings[string] + fret : 'z'
    }
  }, is('note'))

  /*
   * 转换chordNote，为ax, bx等格式
   */
  t = process(t, x=>{
    const {note} = x
    return {
      ...x,
      value : strings[note] + 'x',
    }
  }, is('chordNote'))

  /*
   * 转harmony里的音符为字符串
   */
  t = process(t, setHarmony, is('harmony'))

  /*
   * 搞note和chordNote
   */
  t = process(t, setNote, or(is('note'), is('chordNote')))

  /*
   * 把字符串数组合并
   */
  t = process(t, join, or(isValueOf('piece'), isValueOf('chord')))
  t = process(t, x=>x.value, is('piece'))
  t = process(t, x=>x.chord + x.value, is('chord'))

  t = barsToTrack(t)

  return t
}
