// input组件
// 主要是对react controlled组件进行p->s的改造

import React, { PureComponent } from 'react'
import ActiveStyle from './ActiveStyle.js'

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
  border: '1px solid', // 注：这里有一个React处理style时的bug, 如果把border相关的合并到一个属性的话，直接展示normal 和 focus -> normal，得到的最终html样式会有区别
  borderColor: '#ddd', 
  borderRadius: '3px',
  outline: 'none',
  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)',
  padding : '3px 8px',
  fontSize: '12px',
  lineHeight: '20px',
  '&:focus' : {
    borderColor: '#51a7e8', 
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)',
  },
}

export function GitHub(p){ // github style
  const st = {
    ...input_style_github,
    ...p.style,
  }

  return <ActiveStyle {...p} style={st} >
    <InputCore/>
  </ActiveStyle>
}

