// github主题的控件
/* eslint-disable react/jsx-pascal-case */
// import React, { PureComponent } from 'react'
import React from 'react'
import _ from 'lodash'

import {InputCore} from './Input.js'
import _active from './ActiveStyle.js'
import {merge_props_with_def_style as merge_st, merge_props} from './utils.js'

const styles = (x=>{

  const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

  return {

    input : {
      color: '#333', // 字体颜色
      verticalAlign: 'middle',
      background: 'right 8px center no-repeat rgb(255, 255, 255)',
      border: '1px solid', // 注：这里有一个React处理style时的bug, 如果把border相关的合并到一个属性的话，直接展示normal 和 focus -> normal，得到的最终html样式会有区别
      borderColor: '#ddd', 
      borderRadius: '3px',
      outline: 'none',
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)',
      padding : '3px 8px',
      fontSize: '12px',
      lineHeight: '20px',
      '&:focus' : {
        borderColor: '#51a7e8', 
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)',
      },
    }, 

    box : {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '3px',
    }, 

    label : {
      fontFamily,
      fontSize: 14,
      color: '#333',
      fontWeight: 600,
      lineHeight: 1.5,
      margin: '6px 0',
    }, 

    subhead : {
      padding: '8px 5px',
      borderBottom : '1px #e5e5e5 solid', 
      fontWeight: 'bold',
    }, 
  }

})()

export function Input(p){ 

  return <_active {...merge_st(styles.input, p)} >
    <InputCore/>
  </_active>
}

export function _box(p){ // 带边框的div
  // 注：只支持 <_box><xx .../><_box/>，不支持 <_box>{xxx}</box>的用法
  let p1 = _.omit(p, 'children') // 省掉children
  p1 = merge_st(styles.box, p1)
  return React.cloneElement(p.children, merge_props(p.children.props, p1))
}

export function Box(p){
  return <div {...merge_st(styles.box, p)}/>
}

export function Label(p){
  return <div {...merge_st(styles.label, p)}/>
}

export function Subhead(p){
  return <div {...merge_st(styles.subhead, p)}/>
}
