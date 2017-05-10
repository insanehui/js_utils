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

// TODO: 后续不再导出该函数，用addStyle更高级的函数来替代
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

// TODO: 后续分析一下有没有将其重写为支持多个style参数的必要
export const addStyle = st=> (Cmp = 'div') => { // => fn(Cmp0) => Cmp1，模仿redux里高阶组件的写法，使用柯里化的形式
  
  class styled extends PureComponent {

    render() {
      const p = this.props 
      return <Cmp {...merge_props_with_def_style(st, p)} />
    }
  }

  return styled
}

export const addProps = _.curry((p0, Cmp)=>{ // 2017年4月9日 尝试使用柯里化，看看是否有实用性

  class New extends PureComponent {

    render() {
      const p = this.props 
      return <Cmp {...merge_props(p0, p)} />
    }
  }

  return New

})

export function get_xy(event, el){ // 根据event（通常是鼠标事件），计算出其相对于html元素的client坐标
  const {top, left} = el.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top
  return {x, y}
}



