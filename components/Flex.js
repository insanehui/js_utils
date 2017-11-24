// Flex布局相关的组件
import {addStyle} from './utils.js'

const S = (x=>{

  const flex = {
    display : 'flex',
  }

  const h = {
    ...flex,
    flexDirection: 'row',
  }

  const v = {
    ...flex,
    flexDirection: 'column',
  }

  return {
    flex, h, v,
  }

})()

export const Flex = addStyle(S.flex)('div')
export const H = addStyle(S.h)('div')
export const v = addStyle(S.v)
export const V = v('div')
