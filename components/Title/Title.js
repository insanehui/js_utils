// React 
import React  from 'react'
import {findDOMNode} from 'react-dom'

import RxPureComponent from '../RxPureComponent.js'

export default class Title extends RxPureComponent {
  state = {
    on : false,
    x : 0,
    y : 0,
  }

  on = (x,y)=>{
    this.setState({ on : true, x, y})
  }

  off = ()=>{
    this.setState({ on : false })
  }

  setEl() {
    this.me = findDOMNode(this)
    this.parent = this.me.parentNode
  }

  setStream(){
    const {mousemove, parent, mouseleave, mouseenter, 
      dragstart, dragend,
      me} = this

    const parentLeave$ = mouseleave(parent)
    const parentEnter$ = mouseenter(parent)

    const dragStart$ = dragstart(parent)
    const dragEnd$ = dragend(parent)

    let parentMove$ = mousemove(parent)
    parentMove$ = parentMove$.debounceTime(350) // 限流

    parentMove$ = parentMove$.clip(parentEnter$, parentLeave$)

    const meEnter$ = mouseenter(me)
    const meLeave$ = mouseleave(me)

    this.on$ = parentMove$.clipr(meEnter$, meLeave$).clipr(dragStart$, dragEnd$) // 拖动的时候不显示Title
    this.off$ = parentLeave$.clipr(meEnter$, meLeave$).merge(dragStart$)
  }

  setEvent(){
    const {off, on, on$, off$, subscribe} = this
    subscribe(on$, e=>{on(e.clientX, e.clientY)})
    subscribe(off$, off)
  }

  componentDidMount(){
    this.setEl()
    this.setStream()
    this.setEvent()
  }

  render() {
    const {on} = this.state 

    const {as:As = 'div', ...rest} = this.props
    let {style} = this.props
    const {x, y} = this.state 

    const p = {
      ...rest,
      style : {
        ...style,
        position : 'fixed',
        left : x+1,
        top : y+1,
        ...(!on && {display:'none'})
      }
    }
    return <As {...p}/>
  }
}
