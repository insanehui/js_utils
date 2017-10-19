/*
 * 可以resize的组件
 */
import React, { PureComponent } from 'react'
import {drag} from '../rx.js'

export default class Resizable extends PureComponent {

  static defaultProps = {
    onResize : ()=>{},
  }

  off = [] // 用来unsubscribe rx的事件

  handle = (to, el) => {
    const {onResize} = this.props
    this.off.push(drag(el).map(d=>({
      to,
      ...d,
    })).subscribe(onResize))
  }

  componentWillUnmount(){
    this.off.map(f => f.unsubscribe())
  }

  render() {
    /*
     * 需要在其外部指定其position为absolute或者为relative
     * TODO: 后面想想如何自动设置
     */
    const {children, 
      /*
       * 方向如下
       * 8(0x80) 1(0x1)  2(0x2)
       * 7(0x40)         3(0x4)
       * 6(0x20) 5(0x10) 4(0x8)
       */
      direction, // 一个整数，用按位&的运算来判断要启用哪些方向
      onResize,

      ...forward} = this.props

    const {handle} = this

    const Left = <div style={{
      left: -7, top: 0, cursor: 'ew-resize',
      width: 14,
      height: '100%',
      position: 'absolute',
    }} ref={handle.bind(null, 'left')} />

    const LeftTop = <div style={{
      left: -5, top: -5, 
      cursor: 'nwse-resize',
      width: 12,
      height: 12,
      borderRadius : 4,
      position: 'absolute',
    }} ref={handle.bind(null, 'left_top')} />

    return <div {...forward}>
      {children}
      {!!(direction&0x40) && Left}
      {!!(direction&0x80) && LeftTop}
    </div>
  }
}
