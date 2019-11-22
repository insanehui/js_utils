/*
 * 解析notation形式的track
 */
import _ from 'lodash'
import program from '../../modash/deepProgram.js'
import process from '../../modash/deepProcess.js'

import {is, isValueOf,} from '../predicates.js'
import translateNote from './translateNote.js'

import toNote from './note.js'
import setHarmony from './harmony.js'
import setNote from './setNote.js'
import barsToTrack from './barsToTrack.js'

const join = a=>a.join('')
const value = a=>a.value

export default function notationTrack(obj, name) {
  const translate = _.get(obj, ['header', 'tracksObj', name, 'jcxObj', 'jianpu', 'translate'])

  if ( translate ) {
    obj = process(obj, translateNote(translate), is('note'))
  } 

  obj = obj.tracks[name].lines

  obj = program(obj, 
    [toNote, is('note')],
    [setHarmony, is('piece'), is('harmony')],
    [setNote, is('piece'), is('note')],
    [join, isValueOf('piece')],
    [value, is('piece')],
  )
  return barsToTrack(obj)
}
