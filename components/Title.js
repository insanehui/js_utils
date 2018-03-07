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

    this.off$ = mouseleave(parent)
    const enter$ = mouseenter(parent)
    const move$ = mousemove(parent)
    // move$.subscribe(()=>console.log('move'))

    let on$ = move$.debounceTime(500)
    on$ = on$.windowToggle(enter$, ()=>this.off$).concatAll()

    this.on$ = on$
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
