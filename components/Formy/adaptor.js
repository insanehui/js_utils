/*
 * 控件的转换器. 可用于把原生的input元素转成formy标准。甚至把一些非控件转成控件
 * 使用了forwardRef
 */
import React, {forwardRef} from 'react'
import {defaultProps} from 'recompose'

import _ from 'lodash'
import hoc from '../displayName/hoc.js'

/*
 * 支持一些快捷调用，比如
 * adaptor(0, e=>e.target.value)('input')
 * 注意仅适用于原生的html 表单输入元素
 */
const maker = (valueMapper, changeMapper = x=>x)=>Cmp=>{
  // eslint-disable-next-line
  {
    if ( !_.isFunction(valueMapper) && !_.isArray(valueMapper) ) {
      valueMapper = x=>x
    } 
    if ( !_.isArray(valueMapper) ) {
      valueMapper = [valueMapper, 'value']
    } 
    if ( !_.isArray(changeMapper) ) {
      changeMapper = [changeMapper, 'onChange']
    } 
  }

  const [valueFunc, valueProp] = valueMapper
  const [changeFunc, changeProp] = changeMapper

  function Adaptor(props, ref) {
    const {value, onChange, ...rest} = props
    return <Cmp {...{
      [valueProp] : valueFunc(value),
      [changeProp] : e=>{
        onChange && onChange(changeFunc(e), e.target)
      },
      ref,
      ...rest,
    }}/>
  }

  Adaptor.displayName = hoc(Cmp, 'adaptor')

  return forwardRef(Adaptor)
}

export default maker

/*
 * 之所以用x||''，是为了防止出现从controlled到uncontrolled间切换的警告
 */
export const normalize = maker(x=>x||'', e=>e.target.value)

export const Input = normalize('input')
/*
 * 待测试
 */
export const Checkbox = maker([v=>!!v, 'checked'], e=>e.target.checked)(defaultProps({type:'checkbox'})('input'))
export const Select = normalize('select')
