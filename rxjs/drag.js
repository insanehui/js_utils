/*
 * 实现rx的draggable
 */
import {NEVER, fromEvent} from 'rxjs'
import {flatMap, takeUntil} from 'rxjs/operators'

import movement from './operators/movement.js'

export default el=>{

  if ( !el ) {
    return NEVER // 增加健壮性
  } 

  // 取window事件是为了防脱手
  const moves = movement(fromEvent(window, 'mousemove'))
  const ups = fromEvent(window, 'mouseup')

  const downs = fromEvent(el, 'mousedown')
  // return moves.clip(downs, ups)

  return flatMap(e=>takeUntil(ups)(moves))(downs) // 这是从rx官方示例里找到的代码，代替clip
}

