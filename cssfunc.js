/*
 * css 装饰器函数
 * cssobj的升级版，进一步贯彻函数式编程的思想
 * 作为react组件的装饰器
 */

import {styler} from './components/utils.js'

export const ellipsis = styler({
  display: 'block',
  whiteSpace: 'nowrap',
  overflow : 'hidden',
  textOverflow: 'ellipsis',
})

export const pointer = styler({
  cursor: 'pointer',
})

export const grab = styler({
  cursor: '-webkit-grab',
})
