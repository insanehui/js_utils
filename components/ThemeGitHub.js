// github主题的控件
/* eslint-disable react/jsx-pascal-case */
// import React, { PureComponent } from 'react'
import React from 'react'
import _ from 'lodash'

import {Input as InputBase} from './Form.js'
import {_active, Active, } from './ActiveStyle.js'
import {merge_props_with_def_style as merge_st, merge_props, PS} from './utils.js'

import {bg, hsl, inblock, css, sz, ptr, rel, } from '../cssobj.js'

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const S = (x=>{

  const label = {
    fontFamily,
    fontSize: 14,
    color: '#333',
    fontWeight: 600,
    lineHeight: 1.5,
    padding: '4px 5px',
  }

  const labelbar = {
    ...label,
    ...bg(hsl(0, 0, 90)),
    transition : '0.1s',
    '&:hover' : bg(hsl(0,0,80)), 
  } 

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

    subhead : {
      padding: '8px 5px',
      borderBottom : '1px #e5e5e5 solid', 
      fontWeight: 'bold',
    }, 

    label, 

    labelet : {
      ...label,
      ...inblock,
    },

    labelbar,

    accordianbar : {
      ...labelbar,
      ...ptr,
    },

    button : {
      padding: '3px 10px',
      fontSize: '12px',
      lineHeight: '20px',
      ...inblock,
      fontWeight : 600, 
      color : '#333',
      whiteSpace : 'nowrap', 
      verticalAlign : 'middle', 
      cursor : 'pointer', 
      userSelect : 'none',
      backgroundColor : '#eee',
      backgroundImage : 'linear-gradient(#fcfcfc, #eee)', 
      border : '1px solid #d5d5d5', 
      borderRadius : 3,
      '&:hover' : {
        backgroundColor : '#ddd',
        backgroundImage : 'linear-gradient(#eee, #ddd)', 
        border : '1px solid #ccc', 
      }, 
      '&:active' : {
        backgroundColor : '#dcdcdc',
        backgroundImage : 'none', 
        border : '1px solid #b5b5b5', 
        boxShadow : 'inset 0 2px 4px rgba(0,0,0,0.15)',
      }, 
    },
  }

})()

export function preset(){
  css({
    '@global' : {
      '*' : {
        fontFamily,
        fontSize: 14,
      }, 
    },
  })
}

export class Input extends PS {

  render() {
    const s = this.state // p->s组件，取s代替p

    const p1 = {
      ...s,
      /*
       * 为什么要提一层onChange出来？
       * 因为active会不断自省，自省时候会召唤内部的InputBase
       * 如果acitve不自理value，则它始终会拿最初传的value去洗脑InputBase
       * 所以会导致active自省的时候，文本框的值就会被重置
       */
      onChange : (v=>{
        this.setState({ value:v })
        s.onChange && s.onChange(v)
      })
    }
    return <_active {...merge_st(S.input, p1)} >
      <InputBase ref='input' />
    </_active>
  }

  select() {
    const r = this.refs
    r.input.select()
  }

}

export function _box(p){ // 带边框的div
  // 注：只支持 <_box><xx .../><_box/>，不支持 <_box>{xxx}</box>的用法
  let p1 = _.omit(p, 'children') // 省掉children
  p1 = merge_st(S.box, p1)
  return React.cloneElement(p.children, merge_props(p.children.props, p1))
}

export function Box(p){
  return <div {...merge_st(S.box, p)}/>
}

export function Label(p){ // 用于表单里的label
  return <div {...merge_st(S.label, p)}/>
}

export function Labelet(p){ // inline的label
  return <div {...merge_st(S.labelet, p)}/>
}

export function Subhead(p){ // 小标题
  return <div {...merge_st(S.subhead, p)}/>
}

export function LabelBar(p){ // 标题栏，支持hover样式
  return <Active {...merge_st(S.labelbar, p)}/>
}

export function AccordianBar(p){ // 手风琴的handle bar
  const left_arrow = {
    ...inblock,
    ...sz(0, 0),
    verticalAlign: -2,
    content : '',
    border : '4px solid rgb(153, 153, 153)', 
    marginRight: 4,
    borderLeftColor : 'transparent', 
    borderRightColor : 'transparent', 
    borderBottomColor : 'transparent', 
  }
  // 因为要将箭头组装进去，所以要用到cloneElement
  return React.cloneElement(<Active {...merge_st(S.accordianbar, p)}/>, null, [<div key='1' style={left_arrow} />, ...React.Children.toArray(p.children)])
}

export function Button(p){

  // 将p根据style，拆分
  const ps = _.pick(p, 'style')

  const p1 = {
    ..._.omit(p, 'style'),

    onClick : e=>{ // 阻止缺省的submit行为
      e.preventDefault()
      p.onClick && p.onClick(e)
    },
  }

  return <_active {...merge_st(S.button, ps)}>
    <button {...p1} />
    </_active>
}

export function Button1(p){ // 蓝色的button
  /*
   * 注：这里太多代码拷贝自Button，后续需要改掉此处不合理的设计
   */

  const hue = 208
  const sat = 56 // 饱和度
  const light = 50 // 亮度

  const style = {
    color : 'white',
    backgroundColor : hsl(hue, sat, light),
    backgroundImage : `linear-gradient(-180deg, ${hsl(hue, sat, light+10)} 0%, ${hsl(hue, sat, light)} 90%)`, 
    ...rel,
    ...inblock,
    padding: '6px 20px',
    fontSize: '12px',
    // fontWeight : 600, 
    lineHeight: '20px',
    whiteSpace : 'nowrap', 
    verticalAlign : 'middle', 
    cursor : 'pointer', 
    userSelect : 'none',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '-1px, -1px',
    backgroundSize: '110% 110%',
    border: '1px solid rgba(27,31,35,0.2)',
    borderRadius : '0.25em',
    '&:hover' : {
      backgroundColor : hsl(hue, sat, light-5),
      backgroundImage : `linear-gradient(-180deg, ${hsl(hue, sat, light + 8)} 0%, ${hsl(hue, sat, light-2)} 90%)`, 
      border : '1px solid rgba(27,31,35,0.5)', 
      backgroundPosition: '0 -0.5em',
    }, 
    '&:active' : {
      backgroundColor : hsl(hue, sat, light-5),
      backgroundImage : 'none', 
      border : '1px solid rgba(27,31,35,0.5)', 
      boxShadow : 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
    }, 
  }

  // 将p根据style，拆分
  const ps = _.pick(p, 'style')
  const {submit} = p

  const p1 = {
    ..._.omit(p, 'style', 'submit'),

    onClick : e=>{ 
      if ( !submit ) {
        e.preventDefault()
      } 
      p.onClick && p.onClick(e)
    },
  }

  return <_active {...merge_st(style, ps)}>
    <button {...p1} />
    </_active>
}

export function Submit(p){ // 保留button缺省的submit行为

  // 将p根据style，拆分
  const ps = _.pick(p, 'style')
  const p1 = _.omit(p, 'style')

  return <_active {...merge_st(S.button, ps)}>
    <button {...p1} />
    </_active>
}
