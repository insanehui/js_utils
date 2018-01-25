/*
 * 将一小控件组合成大控件的组件
 */

import React, { PureComponent, Children, cloneElement } from 'react'
import _ from 'lodash'
const {toArray} = Children

// 判断一个react element是不是一个原生的text类型的控件
function isText({props, type}) {
  if ( type === 'input' ) {
    const itype = _.get(props, 'type', 'text')
    const types = new Set(['text', 'password'])
    if ( types.has(itype) ) {
      return true
    } 
  } 
  return false
}

// 判断一个react element是不是一个原生的checkbox
function isCheckbox({props, type}) {
  return type === 'input' && _.get(props, 'type') === 'checkbox'
}

/*
 * TODO: 还要考虑实现uncontrolled
 */
export default class Form extends PureComponent {

  wrap = children =>{
    const {value, onChange} = this.props

    children =  toArray(children)
    return children.map(child => {
      const {props} = child
      const {name} = props

      if ( name && _.isString(name) ) { // 如果有name，就当其为控件，为其注入一些行为
        if ( isText(child) ) {
          return cloneElement(child, {
            value : _.get(value, [name]),
            onChange : e=>{
              onChange({
                ...value,
                [name] : e.target.value,
              })
            }
          })
        } 
        else if ( isCheckbox(child) ) {
          return cloneElement(child, {
            checked : !!_.get(value, [name]),
            onChange : e=>{
              onChange({
                ...value,
                [name] : e.target.checked,
              })
            }
          })
        } 
        else { // 则是通用直接导出value类型的控件（通常是自定义控件）
          return cloneElement(child, {
            value : _.get(value, [name]),
            onChange : v=>{
              onChange({
                ...value,
                [name] : v,
              })
            }
          })
        }
      } 
      else {
        return child
      }
    })
  }

  render() {
    const {children} = this.props
    const {wrap} = this
    return <form>
      {wrap(children)}
    </form>
  }
}