/*
 * 此处制定一个统一的用于校验的接口规范。
 * 定义一个Validity Checkable的概念：
 * > 为Formy标准的控件. 原生的input等元素需要adaptor包装
 * > 具有validity()方法. 原生的input等元素需要本模块提供的装饰器包装
 */
import React, { PureComponent } from 'react'
import {Input as input} from '../Adapted.js'

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
      return <El {...this.props} ref='el' />
    }
  }
  return ValidityCheckable
}

export default hoc

export const Input = hoc(input)

