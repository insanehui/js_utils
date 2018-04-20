/*
 * 能支持"正在事件处理中..."的状态的组件
 */
import React, { PureComponent } from 'react'
import {func} from 'prop-types'
import _ from 'lodash'

const disable = e=>{
  e.preventDefault()
  e.stopPropagation()
}

export default class Handling extends PureComponent {
  state = { }

  static defaultProps = {
    children : func,
  }

  render() {
    let {children:fn, as:As = 'div', ...props} = this.props
    const {state} = this

    props = _.mapValues(props, (v, name)=>{
      if (/^on[A-z]/.test(name)) { // 否则如果是事件属性，hook一下
        const handler = v
        name = _.camelCase(name.slice(2)) + 'ing'
        if ( state[name] ) { // 如果已经有状态，说明事件正在处理中，直接返回disable
          return disable
        } 
        return async e=>{
          this.setState({ [name]:true })
          await handler(e)
          this.setState({ [name]:false })
        }
      } 
      // 缺省情况原样返回
      return v
    })

    return <As {...props}>
      {fn(state)}
    </As>
  }
}
