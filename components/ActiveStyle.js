// 目前支持:hover，:focus, :active

import React, { PureComponent } from 'react'
import _ from 'lodash'

function factory(wrap = true) { // wrap代表包含子元素，占用html元素层次，false则仅仅起修饰作用

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
          p.onMouseOut && p.onMouseOut(e)
        }),

        onMouseUp : (e=>{
          this.setState({ active : false })
          p.onMouseOut && p.onMouseOut(e)
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

      if ( wrap ) {

        const p1 = {
          ...p,
          ...event,
          ...style,
        }

        return <div {...p1} />
      } 
      else {
        const p1 = {
          ..._.omit(p, 'children'),
          ...event, // event一定要在p后面，以覆盖其事件属性
          ...style,
        }
        return React.cloneElement(p.children, p1)
      }
    }
  }

  return cmp
}

export const _active = factory(false)
export const Active = factory(true)

export function active(Cmp){ // 函数形式，还在试验阶段，考虑要不要和前面的factory代码合并

  class activify extends PureComponent {

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
          p.onMouseOut && p.onMouseOut(e)
        }),

        onMouseUp : (e=>{
          this.setState({ active : false })
          p.onMouseOut && p.onMouseOut(e)
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

      return <Cmp {...p1} />
    }

  }

  return activify 
}

