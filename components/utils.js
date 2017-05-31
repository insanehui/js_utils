// 提供一些常用的React组件编写的工具
import _ from 'lodash'
import React, { PureComponent } from 'react'
import R from 'ramda'

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
export const addStyle = (st = {}) => (Cmp = 'div') => { // => fn(Cmp0) => Cmp1，模仿redux里高阶组件的写法，使用柯里化的形式
  
  class styled extends PureComponent {

    render() {
      const p = this.props 
      return <Cmp {...merge_props_with_def_style(st, p)} />
    }
  }

  return styled
}

const isCmp =  R.either(_.isFunction, _.isString) // 判断一个参数是否代表一个组件

/*
 * 这是一个神奇的函数，暂时将其称这为"基因"
 */
export function styler(para = {} ) { 

  if (isCmp(para)) { // 如果参数已经是一个组件，则直接返回
    return para
  } 

  // 否则，储存基因（即样式）
  const style = para

  return (next = 'div') =>{
    if ( isCmp(next) ) { // 如果next是一个组件，则返回一个新组件

      const Cmp = next // 赋给一个大写的变量，这是React jsx的一个潜规则

      class New extends PureComponent {
        render() {
          const p = this.props 
          return <Cmp {...merge_props_with_def_style(style, p)} />
        }
      }
      return New
    } 

    const sum = {...style, ...next} // 合并样式
    return styler(sum)
  }
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

export function parse_svg_transform(t){ // 将一个svg的transform字段解析成结构化的数据
  // 用状态机来实现
  // TODO: 后续可能要用数字来表示state，用于处理括号嵌套的场景
  const res = {}

  if ( !_.isString(t) ) {
    return res
  } 

  const space = /\s/

  let buf = ''
  let state = 'normal' // 表示下一步的状态，可选状态还有item

  function push(item) {
    const key = item.slice(0, item.indexOf('('))
    res[key] = item
  }

  for(let i = 0; i<t.length; i++){
    const c = t[i]

    // 改变状态部分
    if ( state ==='normal') {
      if ( !space.test(c) ) { // 如果非空白字符
        state = 'item'
      } 
    } 
    else if ( state === 'item' ) {
      if ( buf.endsWith(')') ) {
        state = 'normal'
      } 
    } 

    // 业务逻辑部分
    if ( buf && state === 'normal' ){ 
      push(buf)
      buf = ''
    }
    else { 
      buf += c
    }
  }

  if ( buf ) {
    push(buf)
  } 

  return res
}

// 用于svg的translate
export const translate = (x, y) => (Cmp = 'g') => {

  let transform0 = { translate: `translate(${x}, ${y})` }

  class merged extends PureComponent {

    render() {
      const p = this.props 
      const transform1 = parse_svg_transform(p.transform)
      const transform = _.map({...transform0, ...transform1}).join(' ')

      const p1 = {
        ...p,
        transform,
      }

      return <Cmp {...p1} />
    }
  }

  return merged
}


