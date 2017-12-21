/*
 * 用于拖拉拽界面编辑的场景
 */
import React, { PureComponent, } from 'react'
import {merge_props_with_def_style as merge} from './utils.js'
import {abs, rel} from '../cssobj.js'

function insertable(direction = 'top') {
  /*
   * direction取值有：top, left, right, top
   */
  class Cmp extends PureComponent {
    state = {
      hover : false,
    }

    static displayName = {
      top : 'TopInsertable' ,
      right : 'RightInsertable',
    }[direction]

    refMain = el=>{ // 用来取到Main的width，以克隆给Holder使用
      if ( !el ) {
        return
      } 
      const {width} = el.getBoundingClientRect()
      this.width = width
    }

    render() {
      const {children, 
        onInsert,
        zIndexSensor = 1,
        ...forward} = this.props
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
          ...abs,
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
              right : -7,
              width: 14,
              height: '100%',
            },
          })[direction],
        },
      }

      const Sensor = (<div {...sensor}/>)

      // 注：主元素的position只能先写死为relative
      const Main =  (<div {...merge(rel, forward)} key={0} ref={this.refMain}>
        {children}
        {Sensor}
      </div>)

      /*
       * 为什么Sensor和Holder共用一个元素呢？
       * 因为它们两者不处在相同的dom树位置，哪怕是共用元素，在dom这一层会不断地创建和销毁元素
       * 导致不能正常接受onDragLeave的事件
       */
      const Holder = (<div key={1} style={{
        height : 10,
        backgroundColor : 'gray',
        width : this.width,
        flexShrink : 0, // 防止在flex布局中，在出现滚动条的情况下，holder会被挤掉
      }}/>)

      if ( !hover ) {
        return Main
      } 
      else {
        return [
          Holder, 
          Main, 
        ]
      }
    }
  }

  return Cmp
}

export const TopInsertable = insertable('top')
export const RightInsertable = insertable('right')
export const LeftInsertable = insertable('left')
export const BottomInsertable = insertable('bottom')

// export class TopInsertable extends PureComponent {
//   state = {
//     hover : false,
//   }

//   refMain = el=>{ // 用来取到Main的width，以克隆给Holder使用
//     if ( !el ) {
//       return
//     } 
//     const {width} = el.getBoundingClientRect()
//     this.width = width
//   }

//   render() {
//     const {children, 
//       onInsert,
//       zIndexSensor = 1,
//       ...forward} = this.props
//     const {hover} = this.state 

//     const events = {
//       onDragEnter : e=>{
//         this.setState({ hover : true })
//       },
//       onDragLeave : e=>{
//         this.setState({ hover : false })
//       },
//       onDragOver : e=>{
//         e.preventDefault()
//       },
//       onDrop : e=>{
//         e.stopPropagation()
//         onInsert && onInsert(e)
//         this.setState({ hover : false })
//       }, 
//     }

//     const Sensor = <div style={{
//       top : (hover ? -17 : -7), 
//       left: 0, 
//       width: '100%',
//       ...abs,
//       zIndex : zIndexSensor, // 通过提高zindex来令其能感知事件
//       height : 14,
//     }} {...events}/>

//     // 注：主元素的position只能先写死为relative
//     const Main =  <div {...merge(rel, forward)} key={0} ref={this.refMain}>
//       {children}
//       {Sensor}
//     </div>

//     /*
//      * 为什么Sensor和Holder共用一个元素呢？
//      * 因为它们两者不处在相同的dom树位置，哪怕是共用元素，在dom这一层会不断地创建和销毁元素
//      * 导致不能正常接受onDragLeave的事件
//      */
//     const Holder = <div key={1} style={{
//       height : 10,
//       backgroundColor : 'gray',
//       width : this.width,
//       flexShrink : 0, // 防止在flex布局中，在出现滚动条的情况下，holder会被挤掉
//     }}/>

//     if ( !hover ) {
//       return Main
//     } 
//     else {
//       return [
//         Holder, 
//         Main, 
//       ]
//     }
//   }
// }

