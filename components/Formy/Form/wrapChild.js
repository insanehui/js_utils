/*
 * 用于Formy中对孩子进行包装
 */
import { cloneElement } from 'react'
import _ from 'lodash'

export default ctx => child=>{ 

  const valueMap = {
    text : {
      value : v=>({value : v || ''}),
      onChange : e=>e.target.value,
    },

    checkbox : {
      value : v=>({checked : !!v}),
      onChange : e=>e.target.checked,
    },

    normal : {
      value : v=>({value : v}),
      onChange : v=>v,
    },
  }

  const wrap = key => el=>{
    const {value:topValue, onChange:topOnChange} = ctx.props
    const {props:{name}} = el
    let value = _.get(topValue, [name])
    value = valueMap[key].value(value)

    return cloneElement(el, {
      ref : name,
      ...value,
      onChange : e=>{
        topOnChange({
          ...topValue,
          [name] : valueMap[key].onChange(e),
        }, ctx)
      }
    })
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

  for (const key of ['text','checkbox']) {
    if ( check[`is${_.capitalize(key)}`](child) ) {
      return wrap(key)(child)
    } 
  }
  return wrap('normal')(child)
}
