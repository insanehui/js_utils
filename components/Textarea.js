/*
 * 能自动伸缩的textarea
 */

import React, { PureComponent } from 'react'
import css from 'dom-css'

import {merge_props as P} from './utils.js'

class Textarea extends PureComponent {

  state = {} // state用来存储动态的style

  componentDidMount(){
    // 部署一个辅助div
    const shadow = document.createElement('div')
    const {style} = this.props
    css(shadow, {
      ...style,

      position: 'absolute',
      // top: -9999,

      // 以下样式确保shadow和文本框的排版尺寸一致

      // 以下是临时测试
      top : 300,
      left : 300,
      border : `1px solid gray`,
    })
    document.body.appendChild(shadow)
    this.shadow = shadow
  }

  componentWillUnmount(){
    document.body.removeChild(this.shadow)
  }

  componentWillReceiveProps(np){ 
    // 先更新shadow，以得到其尺寸
    const {value} = np
    this.shadow.innerHTML = value
    const cstyle = window.getComputedStyle(this.shadow)
    console.log("computed", cstyle)
    const {height} = cstyle
    this.setState({ height })
  }

  render() {
    const props = P({style:this.state}, this.props)
    return <textarea {...props}/>
  }
}

export default Textarea

