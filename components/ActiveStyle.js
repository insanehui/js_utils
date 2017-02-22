// 支持:hover，:focus等伪类

import React, { PureComponent } from 'react'
import _ from 'lodash'

import {merge_props_with_def_style as merge_st} from './utils.js'

function factory(wrap = true) { // wrap代表包含子元素，占用html元素层次，false则仅仅起修饰作用

  class cmp extends PureComponent {

    state = {
      mode : 'normal',  // 'normal', 'hover', 'focus',
    }

    render() {
      const p = this.props 

      const s = this.state 

      const onFocus = (e=>{
        this.setState({ mode: 'focus' })
        p.onFocus && p.onFocus(e)
      })

      const onBlur = (e=>{
        this.setState({ mode: 'normal' })
        p.onBlur && p.onBlur(e)
      })

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

      if ( wrap ) {

        const p1 = (x=>{
          return {
            onFocus, // 先hook active的事件
            onBlur,
          }
        })()

        return <div {...p1} />
      } 
      else {
        const p1 = (x=>{ 
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
  }

  return cmp
}

export const _active = factory(false)
export const Active = factory(true)

