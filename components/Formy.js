/*
 * 将一小控件组合成大控件的组件
 */

import React, { PureComponent, Children, cloneElement } from 'react'
import _ from 'lodash'
const {toArray} = Children

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

  // 判断一个react element是不是一个原生的text类型的控件
  isText({props, type}) {
    if ( props.formtype === 'text' ) {
      return true
    } 
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
  isCheckbox({props, type}) {
    return type === 'input' && _.get(props, 'type') === 'checkbox'
  }

  switchy = (child, table, def)=>{ // 用来减少一堆的if else的一个小函数
    for (const key of table) {
      if ( this[`is${key}`](child) ) {
        return this[`wrap${key}`](child)
      } 
    }
    return this[`wrap${def}`](child)
  }

  parse = children =>{
    const {switchy, parse} = this
    children =  toArray(children)
    return children.map(child => {
      const {props} = child

      if ( !props ) { // 递归进入到一个字符串结点时，是没有props的
        return child
      } 
      const {name, children:sub} = props

      if ( name && _.isString(name) ) { // 如果有name，就当其为控件，为其注入一些行为
        return switchy(child, ['Text', 'Checkbox'], 'Normal')
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
    return <form {...rest}>
      {parse(children)}
    </form>
  }
}
