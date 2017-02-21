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
      border: "none", // 没有border
      background: "transparent", // 背景透明

      // 便于嵌到其他元素里，以形成自定义的input样式
    }

    return <input {...s} 
      value={s.value || ''}
      style={{...st, ...s.style, }}
      onChange={this.onChange.bind(this)}
    />
  }
}

export const input_style_github = {
  color: '#333', // 字体颜色
  verticalAlign: 'middle',
  background: 'right 8px center no-repeat rgb(255, 255, 255)',
  border: '1px solid #ddd',
  borderRadius: '3px',
  outline: 'none',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)',
  padding : '3px 8px',
  fontSize: '12px',
  lineHeight: '20px',
}

export function GitHub(p){ // github style
  const st = {
    ...input_style_github,
    ...p.style,
  }

  return <InputCore {...p} style={st} />
}

