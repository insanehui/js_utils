/*
 * 用来包装input、textarea以及具有相同api的元素的hoc
 * 效果是令其在blur的时候才触发onChange
 */

import React, { PureComponent } from 'react'
import {isDev} from '../web/webpack_node_env.js'
import displayName from '../components/displayName/get.js'

export const onblur = Edit => {

  class Input extends PureComponent {
    constructor(p) {
      super(p)
      const {value} = p
      this.state = { value, }
    }

    static displayName = isDev ? `onblur(${displayName(Edit)})` : 't'

    onChange = e=>this.setState({ value:e.target.value })

    onBlur = e=>{
      const {onChange, onBlur} = this.props
      const {value} = this.props 
      onBlur && onBlur(e)
      if ( e.target.value !== value ) {
        onChange && onChange(e)
      } 
    }

    componentWillReceiveProps(np) {
      const {value} = np
      this.setState({ value })
    }

    render() {
      const {value} = this.state 
      const {value:__, ...forward} = this.props
      const {onChange, onBlur} = this
      const input = {
        value, onChange, onBlur,
      }

      // forward要在前面，因为有一些事件是要被覆盖的
      return <Edit {...forward} {...input}/>
    }
  }

  return Input
}
