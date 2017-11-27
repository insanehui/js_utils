// Flex布局相关的组件
import {styler} from './utils.js'

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

export const Flex = styler(S.flex, 'Flex')('div')
export const H = styler(S.h, 'H')('div')
export const v = styler(S.v, 'V')
export const V = v('div')
