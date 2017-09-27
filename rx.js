import {findDOMNode} from 'react-dom'
import Rx from 'rxjs/Rx'
import './rx/mouseDxy.js'

// 构造dom元素的drag事件
export const RxDrag$ = el=>{
  el = findDOMNode(el)
  const moves = Rx.Observable.fromEvent(el, 'mousemove').mouseDxy()
  const ups = Rx.Observable.fromEvent(el, 'mouseup')
  const downs = Rx.Observable.fromEvent(el, 'mousedown')
  const drags = moves.windowToggle(downs, ()=>ups)
  return drags
}

export const RxDrag = el=>{
  return RxDrag$(el).concatAll()
}

