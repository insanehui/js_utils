/*
 * 新的使用rx v6的resizable
 */
import React, { PureComponent } from 'react'
import _ from 'lodash'
import {map} from 'rxjs/operators'
import drag from '../../rxjs/drag.js'
import {abs} from '../../cssobj.js'
import {merge_props_with_def_style as merge} from '../utils.js'

export default class Resizable extends PureComponent {

  static defaultProps = {
    onResize : ()=>{},
  }

  events = {} // 存放要绑定事件的元素

  off = {} // 存放unsubscribe的对象

  handle = (to, el) => {
    if ( el ) {
      this.events[to] = el
    } 
  }

  bind_events() {
    const {onResize} = this.props
    const {off, events} = this
    _.each(events, (el, to) => {
      off[to] && off[to].unsubscribe()
      off[to] = map(d=>({
        to, ...d,
      }))(drag(el)).subscribe(onResize)
    })
  }

  componentDidMount(){
    this.bind_events()
  } 

  componentDidUpdate(pp, ps, pc){
    const {onResize, direction} = this.props
    if ( onResize !== pp.onResize || direction !== pp.direction) {
      this.bind_events()
    } 
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

    const vbar = { // 竖直bar
      top: 0, cursor: 'ew-resize',
      width: 14,
      height: '100%',
      ...abs,
    }

    const hbar = { // 水平bar
      left: 0, 
      cursor: 'ns-resize',
      width: '100%',
      height: 14,
      ...abs,
    }

    const corner = { // 角handle
      width: 12,
      height: 12,
      borderRadius : 4,
      ...abs,
    }

    const Left = <div style={{
      left: -7, ...vbar,
    }} ref={handle.bind(null, 'left')} />

    const Right = <div style={{
      right: -7, ...vbar,
    }} ref={handle.bind(null, 'right')} />

    const Top = <div style={{
      top: -7, ...hbar,
    }} ref={handle.bind(null, 'top')} />

    const Bottom = <div style={{
      bottom : -7, ...hbar,
    }} ref={handle.bind(null, 'bottom')} />

    const TopLeft = <div style={{
      left: -5, top: -5, cursor: 'nwse-resize', ...corner,
    }} ref={handle.bind(null, 'top_left')} />

    const TopRight = <div style={{
      top: -5, right: -5, cursor: 'nesw-resize', ...corner,
    }} ref={handle.bind(null, 'top_right')} />

    const BottomLeft = <div style={{
      bottom: -5, left: -5, cursor: 'nesw-resize', ...corner,
    }} ref={handle.bind(null, 'bottom_left')} />

    const BottomRight = <div style={{
      bottom: -5, right: -5, cursor: 'nwse-resize', ...corner,
    }} ref={handle.bind(null, 'bottom_right')} />

      return <div {...merge({
        position:'relative', 
        userSelect:'none', // 避免误拖动、选中一些文本导致一些奇怪的行为
      }, forward)}>
      {children}
      {!!(direction&0x40) && Left}
      {!!(direction&0x04) && Right}
      {!!(direction&0x01) && Top}
      {!!(direction&0x10) && Bottom}
      {!!(direction&0x80) && TopLeft}
      {!!(direction&0x02) && TopRight}
      {!!(direction&0x20) && BottomLeft}
      {!!(direction&0x08) && BottomRight}
    </div>
  }
}
