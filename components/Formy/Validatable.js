/*
 * 可校验的组件，称为Validatable，其要符合的原则：
 * value, onChange, 支持validity()方法，返回是否valid的详细信息，参见dom的api
 * 注：
 *  通过一个onValid()回调，似乎也是一种方式，目前暂时无法凭空判断哪种方法更佳，姑且先采用inst method的方法
 */
import React, {forwardRef, PureComponent} from 'react'
import {bindState} from '../utils/bindToState.js'

// hoc
const validatify = El => {
  class Validatable extends PureComponent {
    /*
     * 实例方法
     */
    validity = ()=>{
      return this.refs.el.validity
    }

    render(){
      <El {...this.props} ref='el' />
    }
  }
  return Validatable
}
