import {findDOMNode} from 'react-dom'
import Rx from 'rxjs/Rx'

import './rx/mouseDxy.js'
// import './rx/clip.js'

/*
 * 拖动流，可防"脱手"
 */
export const drag = el=>{

  if ( !el ) {
    return Rx.Observable.never() // 增加健壮性
  } 

  el = findDOMNode(el)

  // 取window事件是为了防脱手
  const moves = Rx.Observable.fromEvent(window, 'mousemove').mouseDxy()
  const ups = Rx.Observable.fromEvent(window, 'mouseup')

  const downs = Rx.Observable.fromEvent(el, 'mousedown')
  // return moves.clip(downs, ups)
  return downs.flatMap(e=>moves.takeUntil(ups)) // 这是从rx官方示例里找到的代码，代替clip
}


