// React 
import React  from 'react'
import {findDOMNode} from 'react-dom'
import {fromEvent} from 'rxjs'
import {debounceTime, merge} from 'rxjs/operators'
import clip from '../../rxjs/operators/clip.js'
import clipr from '../../rxjs/operators/clipr.js'

/*
 * rx v6新版
 */
export default class Title extends React.PureComponent {
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
    const { parent, me} = this

    const parentLeave$ = fromEvent(parent, 'mouseleave')
    const parentEnter$ = fromEvent(parent, 'mouseenter')

    const dragStart$ =fromEvent(parent, 'dragstart')
    const dragEnd$ = fromEvent(parent, 'dragend')

    let parentMove$ = fromEvent(parent, 'mousemove')
    parentMove$ = debounceTime(350)(parentMove$) // 限流

    parentMove$ = clip(parentEnter$, parentLeave$)(parentMove$)

    const meEnter$ = fromEvent(me, 'mouseenter')
    const meLeave$ = fromEvent(me, 'mouseleave')

    this.on$ = clipr(dragStart$, dragEnd$)(clipr(meEnter$, meLeave$)(parentMove$)) // 拖动的时候不显示Title
    this.off$ = merge(dragStart$)(clipr(meEnter$, meLeave$)(parentLeave$))
  }

  setEvent(){
    const {off, on, on$, off$} = this
    this.subOn = on$.subscribe(e=>{on(e.clientX, e.clientY)})
    this.subOff = off$.subscribe(off)
  }

  componentDidMount(){
    this.setEl()
    this.setStream()
    this.setEvent()
  }

  componentWillUnmount(){
    this.subOn.unsubscribe()
    this.subOff.unsubscribe()
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
