// 提供一些svg的常用形状

import React from 'react'

export function Arrow(p){

  // return <path d="M 1484.88 593 L 1477.88 596.5 L 1479.63 593 L 1477.88 589.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"></path>
  // 简化的箭头点如下：
  // 0
  //       1
  // 2
  const p0 = { x: 0, y : 0, }
  const p1 = { x: 200, y : 100, }
  const p2 = { x: 0, y : 200, }
  const w0 = p1.x - p0.x
  const h0 = p2.y - p0.y

  const {width, height} = p

  const transform = `scale(${width/w0},${height/h0})`

  return <path d={`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y} L ${p2.x} ${p2.y} Z`} transform={transform} fill="#000000" stroke="#000000" strokeMiterlimit="10" pointerEvents="all"></path>
  // return <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent" />
}

Arrow.defaultProps = {
  width:7,
  height:5,
}
