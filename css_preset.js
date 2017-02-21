// css preset，目的在于令各浏览器展示统一，预填一些常用的设置

import {css, bdbox, } from './cssobj.js'

css({
  '@global' : {
    '*' : {...bdbox}, 
    ':focus' : {
      outline: 'none',
    },
  },
})

