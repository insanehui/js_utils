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

  wrapText = el=>{
    const {value, onChange} = this.props
    const {props:{name}} = el
    return cloneElement(el, {
      value : _.get(value, [name]),
      onChange : e=>{
        onChange({
          ...value,
          [name] : e.target.value,
        })
      }
    })
  }

  wrapCheckbox = el=>{
    const {value, onChange} = this.props
    const {props:{name}} = el
    return cloneElement(el, {
      checked : !!_.get(value, [name]),
      onChange : e=>{
        onChange({
          ...value,
          [name] : e.target.checked,
        })
      }
    })
  }

  wrapNormal = el=>{
    const {value, onChange} = this.props
    const {props:{name}} = el
    return cloneElement(el, {
      value : _.get(value, [name]),
      onChange : v=>{
        onChange({
          ...value,
          [name] : v,
        })
      }
    })
  }

  wrap = children =>{
    const {wrapText, wrapNormal, wrapCheckbox} = this

    children =  toArray(children)
    return children.map(child => {
      const {props} = child

      if ( !props ) { // 递归进入到一个字符串结点时，是没有props的
        return child
      } 

      const {name, children:sub} = props

      if ( name && _.isString(name) ) { // 如果有name，就当其为控件，为其注入一些行为
        if ( isText(child) ) {
          return wrapText(child)
        } 
        else if ( isCheckbox(child) ) {
          return wrapCheckbox(child)
        } 
        else { // 则是通用直接导出value类型的控件（通常是自定义控件）
          return wrapNormal(child)
        }
      } 
      else {
        /*
         * 这里用了递归！
         */
        return cloneElement(child, {}, this.wrap(sub))
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
