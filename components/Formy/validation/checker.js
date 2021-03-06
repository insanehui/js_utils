/*
 * 此处制定一个统一的用于校验的接口规范。
 * 定义一个Validity Checkable的概念：
 * > 为Formy标准的控件. 原生的input等元素需要adaptor包装
 * > 具有validity()方法. 原生的input等元素需要本模块提供的装饰器包装
 */
import React, { PureComponent } from 'react'
import _ from 'lodash'
import {Input as input } from '../adaptor.js'

/*
 * 给onChange注入一个上下文（比如this）
 * 将其扩展为onChange(value, ctx)
 */
const hookOnChange = ctx => ({
  onChange : v=>{
    const onChange = _.get(ctx, 'props.onChange')
    _.isFunction(onChange) && onChange(v, ctx)
  },
})

/*
 * 赋予validity()的hoc
 */
const hoc = El => {
  class ValidityCheckable extends PureComponent {
    /*
     * 实例方法
     */
    validity = ()=>{
      return this.refs.el.validity
    }
    render(){
      return <El {...this.props} ref='el' {...hookOnChange(this)} />
    }
  }
  return ValidityCheckable
}

export default hoc

export const Input = hoc(input)

/*
 * 跟组件state绑定的一个工具函数. 可以指定绑定
 * validity
 * valid
 * value: TODO
 */
export const bindState = ctx => opt => {
  const {
    validity, // 取整个validity对象
    valid, // 只取validity.valid
    /*
     * TODO 允许用户传入一个onChange，并对其接管. 只是hook的形式
     */
  } = opt
  let ret = {}
  if ( opt.value ) { // TODO
  } 
  if ( valid ) {
    const name = _.isString(valid) ? valid : 'valid'
    ret = {
      onChange : (i, target)=>{
        const v = target.validity().valid
        ctx.setState({[name] : v})
      }
    }
  } 
  else if ( validity ) {
    const name = _.isString(validity) ? validity : 'validity'
    ret = {
      onChange : (i, target)=>{
        const v = target.validity()
        ctx.setState({[name] : v})
      }
    }
  } 
  return ret
}
