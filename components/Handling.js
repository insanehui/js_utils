/*
 * 能支持"正在事件处理中..."的状态的组件
 */
import React, { PureComponent } from 'react'
import {func} from 'prop-types'
import _ from 'lodash'

export default class Handling extends PureComponent {
  state = { }

  static defaultProps = {
    children : func,
  }

  render() {
    let {children:fn, as:As, ...props} = this.props

    props = _.mapValues(props, (v, name)=>{
      if (/^on[A-z]/.test(name)) {
        const handler = v
        return async e=>{
          this.setState({ [name]:true })
          await handler(e)
          this.setState({ [name]:false })
        }
      } 
      return v
    })

    return <As {...props}>
      {fn(this.state)}
    </As>
  }
}
