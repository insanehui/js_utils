/*
 * nutanix主题控件
 */
// import React from 'react'

// import _ from 'lodash'

import {addStyle} from './utils.js'
// import {Input as InputBase} from './Form.js'
// import {_active, Active, } from './ActiveStyle.js'
// import {merge_props_with_def_style as merge_st, merge_props, PS} from './utils.js'

import {css, bg, hsl, } from '../cssobj.js'

export const Header = addStyle({
  ...bg( hsl(220, 3, 21) ),
})('div')

export function preset(){
  css({
    '@global' : {
      body : {
        ...bg(hsl(206, 24, 94))
      }, 
    },
  })
}

