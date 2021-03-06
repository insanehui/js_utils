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
    // 查表取到对应的方法
    const mapper = valueMap[key]
    value = mapper.value(value)

    return cloneElement(el, {
      ref : name,
      ...value,
      onChange : (x, self)=>{ // hook
        topOnChange && topOnChange({
          ...topValue,
          [name] : mapper.onChange(x),
        }, ctx)

        // 调用原来的onChange
        const onChange = _.get(el, 'props.onChange')
        _.isFunction(onChange) && onChange(x, self)
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
