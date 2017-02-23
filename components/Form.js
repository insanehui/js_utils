// 跟form有关的一些组件
// 这些组件都是p->s模式

import React, { PureComponent } from 'react'
import _ from 'lodash'

export class Select extends PureComponent {

  static defaultProps = {
    value : null,
    options : [],
  }

  constructor(p) {
    super(p)
    
    this.state = {...p}
  }

  componentWillReceiveProps(np) {
    this.setState({ ...np })
  }

  onChange(e){
    const p = this.props 
    const value = e.targe.value
    this.setState({ value })
    p.onChange && p.onChange(value)
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





