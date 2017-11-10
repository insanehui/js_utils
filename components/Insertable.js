/*
 * 用于拖拉拽界面编辑的场景
 */
import React, { PureComponent, } from 'react'
import {merge_props_with_def_style as merge} from './utils.js'
import {abs, rel} from '../cssobj.js'

const hbar = { // 水平bar
  left: 0, 
  width: '100%',
  height: 14,
  ...abs,
  zIndex : 1, // 通过提高zindex来令其能感知事件
}

export class TopInsertable extends PureComponent {
  state = {
    hover : false,
  }

  render() {
    const {children, 
      ...forward} = this.props
    const {hover} = this.state 

    const events = {
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
        console.log('top insertable drop')
      }, 
    }

    const Sensor = <div style={{
      top : -7, ...hbar,
    }} {...events}/>

    // 注：主元素的position只能先写死为relative
    const Main =  <div {...merge(rel, forward)} key={0}>
      {children}
      {Sensor}
    </div>

    const Holder = <div key={1} style={{
      height : 10,
      backgroundColor : 'gray',
    }}/>

    if ( !hover ) {
      return Main
    } 
    else {
      return [
        Holder, Main, 
      ]
    }
  }
}

