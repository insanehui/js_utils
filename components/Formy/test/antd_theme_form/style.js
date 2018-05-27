import React, {forwardRef} from 'react'
import _ from 'lodash'
import cx from 'classnames'
import sheeter from './utils/components/sheeter.js'
import {css} from './utils/cssobj.js'

import './iconfont.css'

const lightGray = 'rgba(0,0,0,.25)'

const $ = (...p)=>_.merge({}, ...p)

const comm = {
  padding: "4px 11px",
  color: "rgba(0, 0, 0, 0.65)",
  borderRadius: "4px",
  borderStyle : 'solid',
  borderWidth : 1,

  width : 193,
  height : 32,
  boxSizing : 'border-box',

  transition: ".3s",
  '&:focus' : {
    outline : 'none',
  },
  '&::-webkit-input-placeholder' : {
    color : lightGray,
  },
}

export const input = css({
  normal : $(comm, {
    borderColor: "#d9d9d9",
    '&:hover' : {
      borderColor : '#40a9ff',
    },
    '&:focus' : {
      borderColor : '#40a9ff',
      boxShadow : '0 0 0 2px rgba(24,144,255,.2)',
    },
  }),
  error : {
    borderColor: "#f5222d",
    '&:focus' : {
      borderColor : '#ff4d4f',
      boxShadow : '0 0 0 2px rgba(245,34,45,.2)',
    },
  },
})

export const Msg = sheeter({
  '@global' : {
    '@keyframes validationTipIn' : {
      from : {
        opacity : 0,
        transform : 'translateY(-5px)',
      },
      to : {
        opacity : 1,
        transform : 'translateY(0)',
      },
    },
  },
  position : 'absolute',
  left : 0,
  color : '#f5222d',
  fontSize : 13,
  fontWeight : 'normal',
  padding : '2px 0',
  animation : 'validationTipIn 0.3s',
})()

// 注意forward ref
export const iconify = C => forwardRef(({icon, ...props}, ref) => {
  const padding = 30

  return <span style={{display : 'inline-block',position : 'relative'}} >
    <C {...$({style:{paddingLeft:padding - 3}}, props)} ref={ref} />
    <div style={{
      position : 'absolute',
      left : 0,
      top : 0,
      width : padding,
      height : '100%',
      display : 'flex',
      justifyContent : 'center', 
      alignItems : 'center',
      color : 'lightGray',
    }}>
    <i className={`iconfont icon-${icon}`} />
  </div>
</span>
})

const button = css({
  main : {
  },
  error : {
  },
})
export const Button = (props)=>{
  const {disabled} = props
  return <button {...props} className={cx(button.main, {[button.error]:disabled})} />
}
