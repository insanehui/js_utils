/*
 * 将一小控件组合成大控件的组件
 * 注：可以通过uncontrolled里的free函数实现uncontrolled需求
 * TODO: 
 *  是否需要增加as参数
 *  对于一个定义了name，但又不想被formy接管的child，可以增加一个参数来exclude（或者ignore）
 */

import React, { PureComponent, Children, cloneElement } from 'react'
import _ from 'lodash'
import wrap from './Form/wrapChild.js'
import {validatable} from './uncontrolled.js'

const {toArray} = Children

export default class Formy extends PureComponent {

  validity = ()=>{
    /*
     * 所有控件都包含在了this.refs里，遍历取它们的validity()
     */
    const valid =  _.every(_.map(this.refs, (item, key)=>{
      if ( !_.isFunction(item.validity) ) {
        return true
      } 
      const v =  _.get(item.validity(), 'valid')
      return v
    }))
    return {valid}
  }

  fields = ()=>{
    return this.refs
  }

  parse = children =>{
    const {parse} = this
    return toArray(children).map(child => {
      const {props} = child

      if ( !props ) { // 递归进入到一个字符串结点时，是没有props的
        return child
      } 
      const {name, children:sub} = props

      if ( name && _.isString(name) ) { // 如果有name，就当其为控件，为其注入一些行为
        return wrap(this)(child)
      } 
      else if ( sub === undefined ) { // 不处理没有孩子的也没有name的元素
        return child
      } 
      else {
        /*
         * 这里用了递归！
         */
        return cloneElement(child, {}, parse(sub))
      }
    })
  }

  render() {
    const {children,
      value, onChange, // filter
      ...rest
    } = this.props
    const {parse} = this
    return <div {...rest}>
      {parse(children)}
    </div>
  }
}

export const free = validatable(Formy)
