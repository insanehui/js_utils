// input组件
// 主要是对react controlled组件进行p->s的改造

import React, { PureComponent } from 'react'

export class InputCore extends PureComponent {

  constructor(p) {
    super(p)

    // value, onChange等
    this.state = {...p}
  }

  componentWillReceiveProps(np) {
    this.setState({ ...np })
  }

  onChange(e) {
    const s = this.state 
    const value = e.target.value

    this.setState({ value })
    s.onChange && s.onChange(value)
  }

  render() {
    const s = this.state 

    const st = {
      outline: "none", // 没有边框
      borderStyle: "none", // 没有border
      backgroundColor: "transparent", // 背景透明

      // 便于嵌到其他元素里，以形成自定义的input样式
    }

    return <input {...s} 
      value={s.value || ''}
      style={{...s.style, ...st}}
      onChange={this.onChange.bind(this)}
    />
  }
}


