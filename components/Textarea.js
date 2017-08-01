/*
 * 能自动伸缩的textarea
 */

import React, { PureComponent } from 'react'
import css from 'dom-css'

import {merge_props as P} from './utils.js'

class Textarea extends PureComponent {

  state = {} // state用来存储动态的style

  update_shadow = np =>{ // 根据主输入框value的变化，更新shadow
    const {value} = np
    const {style} = this.props
    const {shadow} = this
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

    shadow.innerHTML = value
    const cstyle = window.getComputedStyle(shadow)
    console.log("computed", cstyle)
    const {height} = cstyle
    this.setState({ height })
  }

  componentDidMount(){
    // 部署一个辅助div
    const shadow = document.createElement('div')
    document.body.appendChild(shadow)
    this.shadow = shadow

    // 更新
    this.update_shadow(this.props)
  }

  componentWillUnmount(){
    document.body.removeChild(this.shadow)
  }

  componentWillReceiveProps = this.update_shadow

  render() {
    const props = P({style:this.state}, this.props)
    return <textarea {...props}/>
  }
}

export default Textarea

