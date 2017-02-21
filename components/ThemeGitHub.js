// github主题的控件

// import React, { PureComponent } from 'react'
import React from 'react'

import {InputCore} from './Input.js'
import ActiveStyle from './ActiveStyle.js'
import {merge_props as merge} from './utils.js'

const styles = {
  input : {
    color: '#333', // 字体颜色
    verticalAlign: 'middle',
    background: 'right 8px center no-repeat rgb(255, 255, 255)',
    border: '1px solid', // 注：这里有一个React处理style时的bug, 如果把border相关的合并到一个属性的话，直接展示normal 和 focus -> normal，得到的最终html样式会有区别
    borderColor: '#ddd', 
    borderRadius: '3px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075)',
    padding : '3px 8px',
    fontSize: '12px',
    lineHeight: '20px',
    '&:focus' : {
      borderColor: '#51a7e8', 
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)',
    },
  }, 
}

export function Input(p){ 

  return <ActiveStyle {...merge(p, styles.input)} >
    <InputCore/>
  </ActiveStyle>
}

export function Box(p){ // 带边框的div
}
