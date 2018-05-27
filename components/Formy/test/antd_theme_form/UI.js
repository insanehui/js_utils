/*
 * 一些ui组件
 */
import React from 'react'
import {compose} from 'ramda'
import {change} from './utils/components/Formy/validation/validateOn.js'
import {advanced as reactor} from './utils/components/Formy/validation/reactor.js'
import {Input as input} from './utils/components/Formy/validation/checker.js'
import {iconify, input as sinput, Msg} from './style.js'
import cx from 'classnames'

const R = reactor((C, {valid}, {tip, ...props})=>{
  return <span style={{
    display : 'inline-block',
    position : 'relative',
  }} >
    <C {...props} className={cx(sinput.normal, {[sinput.error]:!valid})} />
    {!valid && <Msg>{tip}</Msg>}
  </span>
})

export function Gap() {
  return <div style={{display : 'inline-block',width:16}} />
}

export const Input = compose(
  change,
  R,
  iconify, 
)(input)

export {free as Form} from './utils/components/Formy/Form.js'
