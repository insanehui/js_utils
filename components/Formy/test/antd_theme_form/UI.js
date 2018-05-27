/*
 * 一些ui组件
 */
import React, { Fragment as F} from 'react'
import {compose} from 'ramda'

import {change} from './utils/components/Formy/validation/validateOn.js'
import {Input as reactor} from './utils/components/Formy/validation/reactor.js'

const R = reactor((C, {valid})=>{
  return <F>
    <C />
    {!valid && <span style={{color:'red'}} >请输入正确的值</span>}
  </F>
})

export const Input = compose(
  change,
)(R)

