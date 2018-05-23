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

const {toArray} = Children

export default class Formy extends PureComponent {

  parse = children =>{
    const {parse} = this
    children =  toArray(children)
    return children.map(child => {
      const {props} = child

      if ( !props ) { // 递归进入到一个字符串结点时，是没有props的
        return child
      } 
      const {name, children:sub} = props

      if ( name && _.isString(name) ) { // 如果有name，就当其为控件，为其注入一些行为
        return wrap(this)(child)
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
