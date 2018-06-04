/*
 * 用于拖拉拽界面编辑的场景
 */
import React, { PureComponent, } from 'react'
import {forwardable} from './utils/forward.js'
import merge from '../modash/merge.js'

function insertable(direction = 'top') {
  /*
   * direction取值有：top, left, right, top
   */

  @forwardable
  class Cmp extends PureComponent {

    static defaultProps = {
      children : null,
      onInsert : e=>e,
      zIndexSensor : 1,
    }

    state = {
      hover : false,
    }

    static displayName = {
      top : 'TopInsertable' ,
      left : 'LeftInsertable' ,
      right : 'RightInsertable',
    }[direction]

    refMain = el=>{ // 用来取到Main的width，以克隆给Holder使用
      if ( !el ) {
        return
      } 
      const {width, height} = el.getBoundingClientRect()
      this.width = width
      this.height = height
    }

    /*
     * 用来感应是否拖动到了边缘
     */
    sensor = ()=>{
      const {
        onInsert,
        zIndexSensor,
        } = this.props
      const {hover} = this.state 
      const sensor = {
        onDragEnter : e=>{
          this.setState({ hover : true })
        },
        onDragLeave : e=>{
          this.setState({ hover : false })
        },
        onDragOver : e=>{
          e.preventDefault()
        },
        onDrop : e=>{
          e.stopPropagation()
          onInsert && onInsert(e)
          this.setState({ hover : false })
        }, 
        style : {
          position : 'absolute',
          zIndex : zIndexSensor, // 通过提高zindex来令其能感知事件
          ...({
            top : {
              top : (hover ? -17 : -7), 
              left: 0, 
              width: '100%',
              height : 14,
            },
            right : {
              top: 0, 
              right : (hover ? -17 : -7),
              width: 14,
              height: '100%',
            },
            left : {
              top: 0, 
              left : (hover ? -17 : -7),
              width: 14,
              height: '100%',
            },
          })[direction],
        },
      }

      return (<div {...sensor}/>)
    }

    main = ()=>{
      const {children} = this.props

      const Sensor = this.sensor()

      // 注：主元素的position只能先写死为relative
      return  (<div {...merge({style:{position : 'relative'}}, this.forwarded())} key={0} ref={this.refMain}>
        {children}
        {Sensor}
      </div>)
    }

    /*
     * drag over上去的时候，用来占位的元素
     */
    holder = ()=>{
      const holder = {
        key : 1,
        style : {
          flexShrink : 0, // 防止在flex布局中，在出现滚动条的情况下，holder会被挤掉
          backgroundColor : 'gray',
          ...({
            top : { height : 10, width : this.width, },
            right : { width : 10, height : this.height, },
            left : { width : 10, height : this.height, },
          })[direction],
        }
      }

      return (<div {...holder}/>)
    }

    render() {
      const {hover} = this.state 
      const Main = this.main()
      const Holder = this.holder()

      if ( !hover ) {
        return Main
      } 
      else {
        return {
          top : [ Holder, Main, ],
          right : [ Main, Holder, ],
          left : [ Holder, Main, ],
        }[direction]
      }
    }
  }

  return Cmp
}

export const TopInsertable = insertable('top')
export const RightInsertable = insertable('right')
export const LeftInsertable = insertable('left')
export const BottomInsertable = insertable('bottom')
