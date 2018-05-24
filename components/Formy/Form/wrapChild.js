/*
 * 用于Formy中对孩子进行包装
 */
import { cloneElement } from 'react'
import _ from 'lodash'

export default ctx => child=>{ 

  const wrap = {
    wrapText : el=>{
      const {value, onChange} = ctx.props
      const {props:{name}} = el
      return cloneElement(el, {
        value : _.get(value, [name]) || '', // 用来防止出现controlled<->uncontrolled的警告
        onChange : e=>{
          onChange({
            ...value,
            [name] : e.target.value,
          })
        }
      })
    },

    wrapCheckbox : el=>{
      const {value, onChange} = ctx.props
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
    },

    wrapNormal : el=>{
      const {value, onChange} = ctx.props
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
    },
  }

  const check = {
    // 判断一个react element是不是一个原生的checkbox
    isCheckbox({props, type}) {
      return type === 'input' && _.get(props, 'type') === 'checkbox'
    },

    // 判断一个react element是不是一个原生的text类型的控件
    isText({props, type}) {
      if ( props.formtype === 'text' ) {
        return true
      } 
      if ( type === 'input' ) {
        const itype = _.get(props, 'type', 'text')
        const exclude = new Set(['checkbox', 'button', 'reset', 'submit'])
        if ( !exclude.has(itype) ) {
          return true
        } 
      } 
      return false
    },
  }

  for (const key of ['Text','Checkbox']) {
    if ( check[`is${key}`](child) ) {
      return wrap[`wrap${key}`](child)
    } 
  }
  return wrap[`wrapNormal`](child)
}
