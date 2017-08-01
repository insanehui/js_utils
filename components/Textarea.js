/*
 * 能自动伸缩的textarea
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'
import css from 'dom-css'

import {merge_props as P} from './utils.js'

class Textarea extends PureComponent {

  state = {} // state用来存储动态的style

  update_shadow = np =>{ // 根据主输入框value的变化，更新shadow
    let {value} = np
    const {style} = this.props
    const {shadow, textarea} = this

    // shadow会沿用textarea一些关键的样式配置
    const text_style = _.pick(window.getComputedStyle(textarea),
      'fontSize', 'fontFamily', 'whiteSpace', 'wordWrap'
    )

    css(shadow, {
      ...style,
      ...text_style,

      position: 'absolute',
      top: -9999,

      // 以下是临时测试
      // top : 300,
      // left : 300,
      // border : `1px solid gray`,
    })

    if ( value.endsWith('\n') || !value ) { // 如果末尾有空行，或者为空
      value += ' ' // 多加一个空格
    } 

    shadow.innerHTML = value
    const shadow_style = window.getComputedStyle(shadow)
    console.log("computed", shadow_style)
    const {height} = shadow_style
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

  ref = el=>{ this.textarea = el }

  render() {
    const props = P({style:this.state}, this.props)
    return <textarea {...props} ref={this.ref}/>
  }
}

export default Textarea

