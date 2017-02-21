// 支持:hover，:focus等伪类

import React, { PureComponent } from 'react'
import _ from 'lodash'

class ActiveStyle extends PureComponent {

  state = {
    mode : 'normal',  // 'normal', 'hover', 'focus',
  }

  render() {
    const p = this.props 
    const s = this.state 

    const p1 = (x=>{

      const style = (x=>{ // 求出其style
        if ( !_.isObject(p.style) ) {
          return null
        }

        const {style} = p

        if ( s.mode === 'focus' ) {
          return {style:{...style, ...style['&:focus']}}
        } 

        return {style : _.omit(style, '&:focus')}

      })()

      const onFocus = (x=>{
        this.setState({ mode: 'focus' })
      })

      const onBlur = (x=>{
        this.setState({ mode: 'normal' })
      })

      return {
        onFocus,
        onBlur,
        ..._.omit(p, 'children'),
        ...style,
      }

    })()

    return React.cloneElement(p.children, p1)
  }
}

export default ActiveStyle

