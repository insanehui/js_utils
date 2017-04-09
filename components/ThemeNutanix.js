/*
 * nutanix主题控件
 */
// import React from 'react'

// import _ from 'lodash'

import {addStyle} from './utils.js'
// import {Input as InputBase} from './Form.js'
// import {_active, Active, } from './ActiveStyle.js'
// import {merge_props_with_def_style as merge_st, merge_props, PS} from './utils.js'

import {css, bg, hsl, inblock, } from '../cssobj.js'

export const Header = addStyle({
  ...bg( hsl(220, 3, 21) ),
})('div')

export const S = {
  barbg : bg(hsl(206, 24, 94)),
}

export function preset(){
  css({
    '@global' : {
      body : {
        // ...bg(hsl(206, 24, 94)),
      }, 
    },
  })
}

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
