/*
 * 后来又写了一个Active.js，以为比本文中设计得更好，但后来发现似乎产生了过度设计
 * 因为通常仅仅是为了实现active的style时，Active并不比ActiveStyle好用
 * 目前支持:hover，:focus, :active
 */ 

import React, { PureComponent } from 'react'
import _ from 'lodash'

function factory(Wrap = true) { // Wrap代表包含子元素，占用html元素层次，false则仅仅起修饰作用

  class cmp extends PureComponent {

    state = {
      focus : false,  
      hover : false,
      active : false,
    }

    render() {
      const p = this.props 

      const s = this.state 

      const event = {
        onFocus : (e=>{
          this.setState({ focus : true})
          p.onFocus && p.onFocus(e)
        }),

        onBlur : (e=>{
          this.setState({ focus : false})
          p.onBlur && p.onBlur(e)
        }),

        onMouseMove : (e=>{
          this.setState({ hover: true})
          p.onMouseMove && p.onMouseMove(e)
        }),

        onMouseOut : (e=>{
          this.setState({ hover : false })
          p.onMouseOut && p.onMouseOut(e)
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

      const style = (x=>{ // 求出其style
        if ( !_.isObject(p.style) ) {
          return null
        }

        const {style} = p
        let st = _.omit(style, '&:focus', '&:hover')

        if ( s.hover ){
          st =  {...st, ...style['&:hover']}
        }

        if ( s.focus ) {
          st =  {...st, ...style['&:focus']}
        } 

        if ( s.active ) {
          st =  {...st, ...style['&:active']}
        } 

        return {style: st}

      })()

      const p1 = {
        ...p,
        ...event,
        ...style,
      }

      if ( Wrap === true ) {
        return <div {...p1} />
      }
      else if ( _.isObject(Wrap) || _.isString(Wrap)) { // 这时传的是一个组件类
        // 好像string类型的组件也能放到jsx中，完美！
        // 注：就是这里，要求Wrap一定要大写开头!
        return <Wrap {...p1} />
      } 
      else {
        return React.cloneElement(p.children, _.omit(p1, 'children'))
      }
    }
  }

  return cmp
}

export const _active = factory(false)
export const Active = factory(true)
export const active = factory

