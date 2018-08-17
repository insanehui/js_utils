/*
 * 实现rx的draggable
 */
import {findDOMNode} from 'react-dom' // 姑且先把这个加上，等到某些场景不需要react的时候，再去掉吧
import {NEVER, fromEvent} from 'rxjs'
import {flatMap, takeUntil, 
  // tap,
} from 'rxjs/operators'

import movement from './operators/movement.js'

import windowEvent from './windowEvent.js'

export default el =>{
  el = findDOMNode(el)
  if ( !el ) {
    return NEVER // 增加健壮性
  } 

  // 取window事件是为了防脱手
  const moves = movement(windowEvent('mousemove'))
  const ups = windowEvent('mouseup')

  const downs = fromEvent(el, 'mousedown')
  // return moves.clip(downs, ups)

  return flatMap(e=>takeUntil(ups)(moves))(downs) // 这是从rx官方示例里找到的代码，代替clip
}

