/*
 * 可提供一些rx便利的react组件基类
 * TODO: 其实似乎也可以写成一个装饰器，比如@rx，这样可能使用更灵活
 */
import { PureComponent } from 'react'
import {findDOMNode} from 'react-dom'

import Rx from 'rxjs/Rx'
import '../rx/mouseDxy.js'
import '../rx/stopPropagation.js'
import '../rx/clip.js'

export default class RxPureComponent extends PureComponent {
  constructor(p) {
    super(p)
    const events = [
      'mousedown', 'click', 'mousemove', 'mouseout', 'mouseleave', 'mouseenter', 
      'dragstart', 'dragend',
    ]
    for (const event of events) {
      this[`${event}`] = node => this.event(node, event)
    }
  }

  subscription = []

  event = (node, event) => {
    return Rx.Observable.fromEvent(findDOMNode(node), event) // so we can pass in a react inst
  }

  subscribe = (stream, func) => {
    this.subscription.push( stream.subscribe(func) )
  }

  componentWillUnmount(){
    for (const sub of this.subscription) {
      sub.unsubscribe()
    }
  }
}
