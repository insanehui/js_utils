/*
 * 控件的转换器. 可用于把原生的input元素转成formy标准。甚至把一些非控件转成控件
 * 使用了forwardRef
 */
import React, {forwardRef} from 'react'
import _ from 'lodash'
import hoc from '../displayName/hoc.js'

/*
 * 支持一些快捷调用，比如
 * adaptor(0, e=>e.target.value)('input')
 */
export default (value, change = x=>x)=>Cmp=>{
  if ( !_.isFunction(value) ) {
    value = x=>x
  } 
  if ( !_.isArray(value) ) {
    value = [value, 'value']
  } 
  if ( !_.isArray(change) ) {
    change = [change, 'onChange']
  } 

  const [valueFunc, valueProp] = value
  const [changeFunc, changeProp] = change

  function Adaptor(props, ref) {
    const {value, onChange, ...rest} = props
    return <Cmp {...{
      [valueProp] : valueFunc(value),
      [changeProp] : e=>{
        onChange && onChange(changeFunc(e))
      },
      ref,
      ...rest,
    }}/>
  }

  Adaptor.displayName = hoc(Cmp, 'adaptor')

  return forwardRef(Adaptor)
}
