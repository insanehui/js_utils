/*
 * ActiveStyle的一个改进版的设计
 * 这个设计不会接受类似于 &:hover 这样的style属性，而是响应hover等事件，然后给其子组件（唯一）发送相应消息
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'

export function active(Cmp) { 

  class Active extends PureComponent {

    state = {
      focused : false,  
      hovered : false,
      active : false,
    }

    render() {
      const p = this.props 
      const s = this.state 

      const event = {
        onFocus : (e=>{
          this.setState({ focused : true})
          p.onFocus && p.onFocus(e)
        }),

        onBlur : (e=>{
          this.setState({ focus : false})
          p.onBlur && p.onBlur(e)
        }),

        onMouseMove : (e=>{
          this.setState({ hovered: true})
          p.onMouseMove && p.onMouseMove(e)
        }),

        // onMouseOut : (e=>{
        //   this.setState({ hovered : false })
        //   p.onMouseOut && p.onMouseOut(e)
        // }),

        onMouseEnter : (e=>{
          this.setState({ hovered: true})
          p.onMouseEnter && p.onMouseEnter(e)
        }),

        onMouseLeave : (e=>{
          this.setState({ hovered : false })
          p.onMouseLeave && p.onMouseLeave(e)
        }),

        onMouseDown : (e=>{
          this.setState({ active : true })
          p.onMouseDown && p.onMouseDown(e)
        }),

        onMouseUp : (e=>{
          this.setState({ active : false })
          p.onMouseUp && p.onMouseUp(e)
        }),

      }

      const p1 = {
        ...p,
        ...event,
        ...s,
      }

      return <Cmp {...p1} />
    }
  }

  return Active
}
