/*
 * 通过checkbox为实现两个值中选一个的行为
 */

import React, { PureComponent } from 'react'

export default class CheckboxSelect extends PureComponent {
  render() {
    /*
     * 事实上，on和off都是选填的，通常是off可不填（当然如果两个都不填则没有意义）
     */
    const {on, off, value, onChange, ...rest} = this.props
    return <input type='checkbox'
      checked={value === on}
      onChange={e=>{
        onChange(e.target.checked ? on : off)
      }}
      {...rest} />
  }
}
