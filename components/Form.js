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




