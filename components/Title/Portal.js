/*
 * Portal形式的Title。这种方案可以解决svg元素的title问题
 */
import React, { cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import {Portal} from 'react-portal'

import {fromEvent} from 'rxjs'
import {debounceTime, merge, delay} from 'rxjs/operators'
import clip from '../../rxjs/operators/clip.js'
import clipr from '../../rxjs/operators/clipr.js'

export default class Title extends React.PureComponent {
  state = {
    on : false,
    x : 0,
    y : 0,
  }

  static defaultProps = {
    dx : 0,
    dy : 0,
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
    const {outer, tip} = this

    const leave$ = delay(1)(fromEvent(outer, 'mouseleave'))
    const enter$ = fromEvent(outer, 'mouseenter')

    let move$ = fromEvent(outer, 'mousemove')
    move$ = debounceTime(350)(move$) // 限流

    move$ = clip(enter$, leave$)(move$)

    const tipEnter$ = fromEvent(tip, 'mouseenter')
    const tipLeave$ = delay(1)(fromEvent(tip, 'mouseleave'))

    this.on$ = clipr(tipEnter$, tipLeave$)(move$)

    // 离开父元素（排除掉进入tip）或离开tip（排除掉进入父元素）
    this.off$ = merge( clipr(enter$, leave$)(tipLeave$))(clipr(tipEnter$, tipLeave$)(leave$))
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

    const {children, title, dx, dy} = this.props
    const {x, y} = this.state 

    const style = {
      position : 'fixed',
      /*
       * +1为了不阻断鼠标点击事件
       */
      left : x+1+dx,
      top : y+1+dy,
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

