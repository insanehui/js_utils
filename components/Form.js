// 跟form有关的一些组件
// 这些组件都是p->s模式

import React from 'react'
import _ from 'lodash'

import {PS} from './utils.js'

export class ControlBase extends PS { // 针对e.target.value

  onChange(e){
    const p = this.props 
    const value = e.target.value
    this.setState({ value })
    p.onChange && p.onChange(value)
  }
}

export class Select extends ControlBase {

  static defaultProps = {
    value : '',
    options : [],
  }

  render() {
    const s = this.state 
    const p1 = _.omit(s, 'options')

    return <select {...p1} onChange={this.onChange.bind(this)}>
      {_.map(s.options,(item, i ) => {

        const {value, label} = (x=>{
          let value, label

          if ( !_.isObject(item) ) {
            value = label = item
            return {value, label}
          }
          return item
        })()

        return <option key={i} value={value}>{label}</option>
      }) }
    </select>
  }
}

export class Text extends ControlBase {
  static defaultProps = {
    value : '',
  }

  render() {
    const s = this.state 
    return <textarea {...s} onChange={this.onChange.bind(this)} />
  }
}

export class Checkbox extends PS { // 不是标准的e.target.value类型，因此不能继承自ControlBase

  static defaultProps = {
    value : false,
  }

  onChange(e){
    const p = this.props 
    const value = e.target.checked
    this.setState({ value })
    p.onChange && p.onChange(value)
  }

  render() {
    const s = this.state 
    return <input type='checkbox' checked={!!s.value} {..._.omit(s, 'value')} onChange={this.onChange.bind(this)} />
  }
}

export class Input extends ControlBase {

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
      ref='input'
    />
  }

  select(){
    const r = this.refs
    r.input.select()
  }

}








