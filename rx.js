import {findDOMNode} from 'react-dom'
import Rx from 'rxjs/Rx'
import './rx/mouseDxy.js'

/*
 * 拖动流，可防"脱手"
 */
export const drag = el=>{
  el = findDOMNode(el)

  const moves = Rx.Observable.fromEvent(window, 'mousemove').mouseDxy()
  const ups = Rx.Observable.fromEvent(window, 'mouseup')
  const downs = Rx.Observable.fromEvent(el, 'mousedown')
  const drags = moves.windowToggle(downs, ()=>ups)
  return drags.concatAll()
}


