// import _ from 'lodash'
import process from '../../modash/deepProcess.js'
// import copyJson from '../../debug/copyJson.js'

import {isProp, isLvl} from '../predicates.js'

import notationTrack from './notationTrack.js'
import tabTrack from './tabTrack.js'
import durationBug from './museDurationBug.js'
import duration from './duration.js'

export default function makeTracks(obj) {

  /*
   * 处理一下duration
   */
  obj = process(obj, durationBug, isProp('duration'))
  obj = process(obj, duration, isProp('duration'), isLvl(1))

  let res = ''
  const {tracks} = obj.header
  for (const track of tracks) {
    const {name} = track
    for (const i in track.jcx) {
      const {type} = track.jcx[i]
      res += `[V:${name}${i}]\n`
      if ( type === 'jianpu' ) {
        res += notationTrack(obj, name)
      } 
      else if ( type === 'tab' ) {
        res += tabTrack(obj, name)
      } 
      res += '\n\n'
    }
  }
  return res
}

