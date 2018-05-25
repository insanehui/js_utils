/*
 * validation reactor的测试
 */
import React, { PureComponent, Fragment as F} from 'react'
import {compose} from 'ramda'
import _ from 'lodash'

import {render} from 'react-dom'
import {free} from './utils/components/Formy/uncontrolled.js'
import $ from './utils/modash/bind.js'
import {Input as input} from './utils/components/Formy/validation/checker.js'
import reactor from './utils/components/Formy/validation/reactor.js'

const V = reactor((C, props, ref, invalid,)=>{
  return <C {...props} ref={ref} style={{
    borderColor : invalid ? 'red' : 'gray',
  }} />
})

const V2 = reactor((C, props, ref, invalid,)=>{
  return <F>
    <C {...props} ref={ref} />
    {invalid && <span style={{color:'red'}} >请输入正确的值</span>}
  </F>
})

// const wrap = $(compose, 
//   $(free, _, 'checkValidity'),
//   _,
// )

const wrap = r=>compose(
  $(free, _, 'checkValidity'), 
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
        <button onClick={()=>{ this.refs.input.checkValidity() }}>on</button>
        <button onClick={()=>{ this.refs.input.checkValidity(false) }}>off</button>
      </div>
      <div>
        <Input2 ref='input2' pattern='bbb' required placeholder='输入"bbb"才是正确的值' />
        <br />
        <button onClick={()=>{ this.refs.input2.checkValidity() }}>on</button>
        <button onClick={()=>{ this.refs.input2.checkValidity(false) }}>off</button>
      </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

