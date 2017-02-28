// 提供一些svg的常用形状

import React from 'react'

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

  let {w, h, x, y, tx, ty} = p
  x -= 0
  y -= 0
  w -= 0
  h -= 0
  tx -= 0
  ty -= 0

  const transform = `translate(${x}, ${y}) scale(${w/w0},${h/h0}) rotate(${180*Math.atan2(ty, tx)/Math.PI})`

  return <path d={`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`} transform={transform} fill="#000000" stroke="#000000" strokeMiterlimit="10" pointerEvents="all"></path>
}

Arrow.defaultProps = {
  // 缺省状态下，是一个200 x 200 的箭头图案
  x : 200, 
  y : 100, 
  w : 200,
  h : 200,
  tx : 1, // 表示actangent的角度
  ty : 0,
}
