import {firstor} from '../../modash.js'

export default function makeTrackMeta(obj) {
  const {header:{tracks}} = obj
  let res = ''

  const first = firstor()

  for (let {name, jcx} of tracks) {
    for(const i in jcx) {
      const {type} = jcx[i]
      /*
       * 先暂时把一些配置写死，因为它们只是用来播放的
       */
      res += `V:${name}${i} style=${type} ${first()?'bracket=10':''}\n`
    }
  }
  return res
}

