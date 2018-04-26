/*
 * Portal形式的Title。这种方案可以解决svg元素的title问题
 */
import React, { cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import {Portal} from 'react-portal'

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
    /*
     * 因为this是一个数组（React里的fragment概念，对于fragment的情况，findDOMNode是取第一个元素的dom）
     */
    this.outer = findDOMNode(this)
  }

  portal = el=>{
    if ( el ) {
      this.tip = findDOMNode(el)
    } 
  }

  setStream(){
    const {mousemove, mouseleave, mouseenter, outer, tip} = this

    const leave$ = mouseleave(outer).delay(1)
    const enter$ = mouseenter(outer)

    let move$ = mousemove(outer)
    move$ = move$.debounceTime(350) // 限流

    move$ = move$.clip(enter$, leave$)

    const tipEnter$ = mouseenter(tip)
    const tipLeave$ = mouseleave(tip).delay(1)

    this.on$ = move$.clipr(tipEnter$, tipLeave$)
    this.off$ = leave$.clipr(tipEnter$, tipLeave$).merge(
      tipLeave$.clipr(enter$, leave$)
    )
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

    const {children, title} = this.props
    const {x, y} = this.state 

    const style = {
      position : 'fixed',
      left : x,
      top : y,
      ...(!on && {display:'none'})
    }

    return [
      cloneElement(children, {key:1}),
      <Portal key={2}>
        <div style={style} ref={this.portal}>
          {title}
        </div>
      </Portal>
    ]
  }
}

