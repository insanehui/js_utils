/*
 * nutanix主题控件
 */
import _ from 'lodash'
import {addStyle} from './utils.js'

import {css, bg, hsl, inblock, } from '../cssobj.js'

export const S = (x=>{
  const hue = 206

  return {
    barbg : bg(hsl(hue, 24, 94)), // 淡灰绿色的背景，作为ui的底框
    font : {
      dark : {
        color: hsl(hue, 9, 28), // 深色的字体
        fontWeight: 600, 
      },
      light : {
        color: hsl(196, 7, 57),
      },
    },
    bd_radius : {
      borderRadius : 4,
    },
    bd : {
      border: `1px solid ${hsl(220, 4, 87)}`,
    }, 
  }
})()

export function preset(){
  css({
    '@global' : {
      body : {
        // ...bg(hsl(206, 24, 94)),
      }, 
    },
  })
}

export const Header = addStyle({
  ...bg( hsl(220, 3, 21) ),
})('div')

export const Label = addStyle({
  fontSize: 14,
  ...S.font.light,
  fontWeight: 600,
  lineHeight: 1.5,
  padding: '4px 5px',
})('div')

export const Labelet = addStyle(inblock)(Label)

export const box = addStyle({
  backgroundColor: '#fff',
  ...S.bd,
  ...S.bd_radius,
})

export const Box = box('div')

export const font = _.curry((theme, cmp)=>{
  return addStyle(S.font[theme])(cmp)
})

export const Hr = addStyle({
  height: 1,
  borderBottom : `1px solid ${hsl(0, 0, 90)}`,
})('div')
