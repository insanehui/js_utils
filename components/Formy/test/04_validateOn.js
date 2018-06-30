// React 
import React, { PureComponent} from 'react'
import {compose} from 'ramda'

import {render} from 'react-dom'
import {Input} from './utils/components/Formy/validation/checker.js'
import reactor from './utils/components/Formy/validation/reactor.js'
import {validatable as free} from './utils/components/Formy/uncontrolled.js'
import {blur, change} from './utils/components/Formy/validation/validateOn.js'

const V = reactor((C, {valid})=>{
  return <C style={{
    borderColor : !valid ? 'red' : 'gray',
  }} />
})

const wrap = x=>compose(x, free, V)(Input)
const InputBlur = wrap(blur)
const InputChange = wrap(change)

class Test extends PureComponent {

  render() {
    return <div>
      <InputBlur pattern='aa' required placeholder='请输入"aa", 失去焦点触发校验' />
      <br />
      <br />
      <InputChange pattern='bb' required placeholder='请输入"bb", 实时校验' />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

