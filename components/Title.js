// React 
import React  from 'react'
import {findDOMNode} from 'react-dom'

import RxPureComponent from './RxPureComponent.js'

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

  setParent() {
    this.parent = findDOMNode(this).parentNode
  }

  setStream(){
    const {mousemove, parent, mouseleave, mouseenter} = this

    const parentLeave$ = mouseleave(parent)
    const parentEnter$ = mouseenter(parent)

    let parentMove$ = mousemove(parent)
    parentMove$ = parentMove$.debounceTime(500) // 限一下流

    parentMove$ = parentMove$.clip(parentEnter$, parentLeave$)

    this.on$ = parentMove$
    this.off$ = parentLeave$
  }

  setEvent(){
    const {off, on, on$, off$, subscribe} = this
    subscribe(on$, e=>{on(e.clientX, e.clientY)})
    subscribe(off$, off)
  }

  componentDidMount(){
    this.setParent()
    this.setStream()
    this.setEvent()
  }

  render() {
    const {on} = this.state 
    if ( !on ) {
      return <noscript />
    } 

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
      }
    }
    return <As {...p}/>
  }
}
