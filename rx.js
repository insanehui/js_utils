import {findDOMNode} from 'react-dom'
import Rx from 'rxjs/Rx'
import './rx/mouseDxy.js'

/*
 * 拖动流，可防"脱手"
 */
export const drag = (el, parent)=>{
  el = findDOMNode(el)
  parent = parent || el.parentNode || el

  const moves = Rx.Observable.fromEvent(parent, 'mousemove').mouseDxy()
  const ups = Rx.Observable.fromEvent(parent, 'mouseup')
  const downs = Rx.Observable.fromEvent(el, 'mousedown')
  const drags = moves.windowToggle(downs, ()=>ups)
  return drags.concatAll()
}


