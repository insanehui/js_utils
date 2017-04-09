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
        // color: hsl(hue, 9, 28), // 深色的字体
        color: `rgb(66, 73, 81)`, // 深色的字体
        fontWeight: 600, 
      }
    }
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
  color: hsl(196, 7, 57),
  fontWeight: 600,
  lineHeight: 1.5,
  padding: '4px 5px',
})('div')

export const Labelet = addStyle(inblock)(Label)

export const box = addStyle({
  backgroundColor: '#fff',
  border: `1px solid ${hsl(220, 4, 87)}`,
  borderRadius : 4,
})

export const Box = box('div')

export const font = _.curry((theme, cmp)=>{
  return addStyle(S.font[theme])(cmp)
})
