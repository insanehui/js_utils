/*
 * 提供一个平滑地将窗口滚动到顶部的函数
 */
import React, { PureComponent } from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {Motion, spring, } from 'react-motion'

const el = document.createElement('div') // 原来不用挂到dom也可以使用啊

class Scroller extends PureComponent {
  render() {
    const {y} = this.props
    return <Motion defaultStyle={{y,}} style={{y:spring(0)}} onRest={()=>{
      unmountComponentAtNode(el)
    }}>
      {({y})=>{
        window.scroll(0, y)
        return null
      }}
    </Motion>
  }
}

export default function scrollToTop() { // 圆滑地滚动到顶部的函数
  render(<Scroller y={window.scrollY} />, el)
}

