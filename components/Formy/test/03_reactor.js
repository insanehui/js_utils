/*
 * validation reactor的测试
 */
import React, { PureComponent, Fragment as F} from 'react'
import {compose} from 'ramda'

import {render} from 'react-dom'
import {validatable as free} from './utils/components/Formy/uncontrolled.js'
import {Input as input} from './utils/components/Formy/validation/checker.js'
import reactor from './utils/components/Formy/validation/reactor.js'

const V = reactor((C, {valid})=>{
  return <C style={{
    borderColor : !valid ? 'red' : 'gray',
  }} />
})

const V2 = reactor((C, {valid})=>{
  return <F>
    <C />
    {!valid && <span style={{color:'red'}} >请输入正确的值</span>}
  </F>
})

// const wrap = $(compose, 
//  free,
//   _,
// )

const wrap = r=>compose(
  free,
  r,
)(input)

const Input = wrap(V)
const Input2 = wrap(V2)

class Test extends PureComponent {
  render() {
    return <div>
      <div>
        <Input ref='input' pattern='aaa' required placeholder='输入"aaa"才是正确的值' />
        <br />
        <button onClick={()=>{ this.refs.input.checkValidity() }}>校验</button>
        <button onClick={()=>{ this.refs.input.checkValidity({valid:true}) }}>关闭校验</button>
      </div>
      <div>
        <Input2 ref='input2' pattern='bbb' required placeholder='输入"bbb"才是正确的值' />
        <br />
        <button onClick={()=>{ this.refs.input2.checkValidity() }}>校验</button>
        <button onClick={()=>{ this.refs.input2.checkValidity({valid:true}) }}>关闭校验</button>
      </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

