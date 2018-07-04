/* eslint-disable no-lone-blocks */
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
const maker = (valueMapper, changeMapper = x=>x)=>Cmp=>{
  {
    if ( !_.isFunction(valueMapper) ) {
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
 * 将onChange桥接
 */
export const bridgeOnChange = ctx => ({
  onChange : v=>{
    const onChange = _.get(ctx, 'props.onChange')
    _.isFunction(onChange) && onChange(v, ctx)
  },
})

/*
 * 之所以用x||''，是为了防止出现从controlled到uncontrolled间切换的警告
 */
export const Input = maker(x=>x||'', e=>e.target.value)('input')
