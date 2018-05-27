/*
 * 一些ui组件
 */
import React, { Fragment as F} from 'react'
import {compose} from 'ramda'

import {change} from './utils/components/Formy/validation/validateOn.js'
import {xInput as reactor} from './utils/components/Formy/validation/reactor.js'

const R = reactor((C, {valid}, {tip, ...props})=>{
  return <F>
    <C {...props} />
    {!valid && <span style={{color:'red'}} >{tip}</span>}
  </F>
})

export const Input = compose(
  change,
)(R)

