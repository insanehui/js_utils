/*
 * 一些ui组件
 */
import React, { Fragment as F} from 'react'
import {compose} from 'ramda'
import {change} from './utils/components/Formy/validation/validateOn.js'
import {advanced as reactor} from './utils/components/Formy/validation/reactor.js'
import {Input as input} from './utils/components/Formy/validation/checker.js'
import {iconify, input as input_style} from './style.js'

const R = reactor((C, {valid}, {tip, ...props})=>{
  return <F>
    <C {...props} />
    {!valid && <span style={{color:'red'}} >{tip}</span>}
  </F>
})

export function Gap() {
  return <div style={{display : 'inline-block',width:20}} />
}

export const Input = compose(
  change,
  R,
  // iconify, input_style,
)(input)

export {free as Form} from './utils/components/Formy/Form.js'
