// 提供一些常用的React组件编写的工具
import _ from 'lodash'
import React, { PureComponent } from 'react'

export function merge_props(p0, p1){ // 两个props合并，主要是针对style再合并一层

  const style = (x=>{
    if ( !p0 || !p1 || !p0.style || !p1.style ) {
      return null
    } 

    return {
      style : {
        ...p0.style,
        ...p1.style,
      }
    }
  })()

  return {
    ...p0,
    ...p1,
    ...style,
  }
}

export function merge_props_with_def_style(def_style, p){ // 返回新的props

  if ( !_.isObject(def_style) ) {
    return p
  }

  const st = p.style ? {
    style : {
      ...def_style,
      ...p.style,
    },
  } : { style : def_style }

  return {
    ...p,
    ...st,
  }
}

export class PS extends PureComponent { // 注：ps是一个很有争议的模式，慎用！使用时多思考用React标准的controlled和uncontrolled方式是否会更好
  constructor(p) {
    super(p)
    
    this.state = {...p}
  }

  componentWillReceiveProps(np) {
    this.setState({ ...np })
  }
}

export const addStyle = st=> Cmp => { // => fn(Cmp0) => Cmp1，模仿redux里高阶组件的写法，使用柯里化
  
  class styled extends PureComponent {

    render() {
      const p = this.props 
      return <Cmp {...merge_props_with_def_style(st, p)} />
    }
  }

  return styled
}

export function get_xy(event, el){ // 根据event（通常是鼠标事件），计算出其相对于html元素的client坐标
  const {top, left} = el.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top
  return {x, y}
}



