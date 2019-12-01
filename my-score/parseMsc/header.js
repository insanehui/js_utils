import _ from 'lodash'
import yaml from 'js-yaml'

import headerInfo from './headerInfo.js'

export default function parseHeader(file) {
  // 先分成两部分，按 ==========（三个以上） 区分
  let [a, b] = file.split(/===+\n/).map(_.trim)
  const defaultTracks = [
    {
      name : 'A',
      jcx : 'jianpu',
    },
  ]

  let header = {
    title : '乐谱1',
    tracks : defaultTracks ,
  }

  if ( !b ) {
    b = a
  } 
  else {
    let [a1, a2] = a.split('\n\n')
    if ( !a2 && _.isObject(yaml.load(a1)) ) {
      a2 = a1
      a1 = ''
    } 
    _.merge(header, headerInfo(a1), yaml.load(a2))
  }
  const {tracks} = header
  if ( tracks === defaultTracks && header.format) {
    tracks[0].jcx = header.format
    header = _.omit(header, 'format')
  } 

  for (const track of tracks) { // 令jcx里面也有名字
    if ( _.isString(track.jcx) ) {
      track.jcx = [{type:track.jcx}]
    } 

    // 完善到最详细的格式形态
    track.jcx = _.map(track.jcx, v=>{
      if ( (typeof v) === 'string' ) {
        return {
          type : v,
        }
      } 
      else {
        return v
      }
    })
    track.jcxObj = _.mapKeys(track.jcx, v=>v.type)
  }

  // 这个暂时先注释掉，后面用到的时候再开启
  header.tracksObj = _.mapKeys(tracks, v=>v.name)

  return [header, b]
}


