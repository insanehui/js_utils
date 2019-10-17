/*
 * 对原生select的一个小包装
 */
import React from 'react'
import _ from 'lodash'

export default class Select extends React.PureComponent {
  render() {
    const {value, onChange, options, ...rest} = this.props
    return <select value={value} onChange={e=>{
      onChange && onChange(e.target.value)
    }} {...rest} >
      {_.map(options, ({label, value}, i) => <option key={i} value={value}>
        {label}
      </option>)}
    </select>
  }
}
