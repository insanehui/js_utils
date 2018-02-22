/*
 * 2017年11月30日：最新的active。目标是能完全取代ActiveStyle.js和Active.js
 * 用法参见 <url:./ActiveX_test.js>
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'

import {addStyle} from './utils.js'

const factory = Para => {
  /*
   * 目前只支持两种模式:
   * hoc 和 driver
   * 如果仅仅根据active状态响应不同的style时，hoc已经可以胜任（同ActiveStyle里的active、Active里的active_style）
   * 对于更复杂的场景，建议使用driver（不同于之前的设计，而是采用类似react-motion里的思想）
   * driver模式时，会多外包一层dom结构. 因为如果不多包一层结构，无法handle事件
   */

  class Active extends PureComponent {

    state = {
      focused : false,  
      hovered : false,
      active : false,
    }

    render() {
      const p = this.props 

      const {as:Tag = 'div', 
        children } = this.props // 用于driver模式

      const {hovered, focused, active} = this.state 

      const event = {
        onFocus : (e=>{
          this.setState({ focused : true})
          p.onFocus && p.onFocus(e)
        }),

        onBlur : (e=>{
          this.setState({ focused : false})
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

      const style = (x=>{ // 求出其style
        if ( !_.isObject(p.style) ) {
          return null
        }

        const {style} = p
        let st = _.omit(style, '&:focus', '&:hover')

        if ( hovered ){
          st =  {...st, ...style['&:hover']}
        }

        if ( focused ) {
          st =  {...st, ...style['&:focus']}
        } 

        if ( active ) {
          st =  {...st, ...style['&:active']}
        } 

        return {style: st}

      })()

      const p1 = {
        ...p,
        ...event,
        ...style,
      }

      if ( _.isObject(Para) || _.isString(Para)) { // hoc模式
        return <Para {...p1} />
      } 
      else { // driver模式
        return <Tag {...p1}>
          {children({hovered, focused, active})}
        </Tag>
      }
    }
  }

  return Active
}

export const active = (cmp='div') => factory(cmp) // 在factory的基础上，增加一个缺省参数值
export const Active = factory()
export const activeStyle = style => _.flow(active, addStyle(style))

