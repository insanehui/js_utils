// 提供一些svg的常用形状

import React, { PureComponent } from 'react'
import _ from 'lodash'

export function Arrow(p){

  // 简化的箭头点如下：
  // 0
  //       1(原点0,0)
  // 2
  const p0 = { x: -200, y : 100, }
  const p1 = { x: 0, y : 0, }
  const p2 = { x: -200, y : -100, }
  const w0 = p1.x - p0.x
  const h0 = p2.y - p0.y

  let {w, h, x, y, tx, ty, color} = p
  x -= 0
  y -= 0
  w -= 0
  h -= 0
  tx -= 0
  ty -= 0

  const transform = `translate(${x}, ${y}) rotate(${180*Math.atan2(ty, tx)/Math.PI}) scale(${w/w0},${h/h0}) `
  // const transform = `translate(${x}, ${y}) rotate(45) scale(${w/w0},${h/h0}) `

  return <path d={`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`} transform={transform} fill={color} stroke={color} strokeMiterlimit="10" pointerEvents="all"></path>
}

Arrow.defaultProps = {
  // 缺省状态下，是一个200 x 200 的箭头图案
  x : 200, 
  y : 100, 
  w : 200,
  h : 200,
  tx : 1, // 表示actangent的角度，注：tx和ty为pt2 - pt1的值，而pt2代表终点，箭头指向pt2。注意屏幕坐标方向与数学上的区别
  ty : -1,
  color: 'black',
}

export function AutoCurveLink(p){ // 智能连接曲线
  // 计算两个控制点

  // 算出控制杆的长度
  const c_len = (x=>{
    // 不知道process on的算法，先取对角线的一半
    const w = p.x2 - p.x1
    const h = p.y2 - p.y1
    return Math.sqrt(w*w + h*h) / 2
  })()

  return <g>
    <path d={`M ${p.x1} ${p.y1} C ${p.x1} ${p.y1-c_len}, ${p.x2} ${p.y2 + c_len}, ${p.x2} ${p.y2}`} fill='none' {..._.omit(p, 'x1', 'y1', 'x2', 'y2')} />
    <Arrow w={10} h={6} x={p.x2} y={p.y2} tx={0} ty={-1}/>
  </g>
}

AutoCurveLink.defaultProps = {
  x1 : 0, 
  y1 : 100, 
  x2 : 100, 
  y2 : 0, 
}

// 用path来画rect，似乎是更保真？试验一下
export class PRect extends PureComponent {
  static defaultProps = { // 跟rect的的属性基本类似
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    // ...其他react通用属性，会透传
  }

  render() {
    const {x, y, width, height, ...forward} = this.props

    const p_path = {
      d : `M ${x} ${y} h ${width} v ${height} h ${-width} z`,
      transform : `translate(0.5, 0.5)`,
    }
    return <path {...p_path} {...forward} />
  }
}

// 如文档的图标，右上角折回来的形状
export const DocRect = p => {
  const {width, height, ...forward} = p
  const x = _.get(p, 'x', 0)
  const y = _.get(p, 'y', 0)
  const dx = _.get(p, 'dx', width/9)
  const dy = _.get(p, 'dy', height/9)

  const dx0 = dx*2/3
  const dy0 = dy*2/3

  const props = {
    transform : `translate(0.5, 0.5)`,
  }

  const frame = {
    d : `M ${x} ${y} h ${width-dx0} l ${dx0} ${dy0} v ${height-dy0} h ${-width} z`,
  }

  const triangle_big = {
    d : `M ${x+width-dx} 0 v ${dy} h ${dx}`,
  }

  const triangle_small = {
    d : `M ${x+width-dx0} 0 v ${dy0} h ${dx0}`,
  }

  return <g {...props} {...forward} >
    <path {...frame}/>
    <path {...triangle_big}/>
    <path {...triangle_small}/>
  </g>
}


