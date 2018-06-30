/*
 * 演示使用form的validity
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'
import {compose} from 'ramda'

import form from './utils/components/Formy/Form.js'
import checkable from './utils/components/Formy/validation/checker.js'
import {Input as input} from './utils/components/Formy/adaptor.js'
import {free} from './utils/components/Formy/uncontrolled.js'
const Form = free(form, 'validity')

const Input = compose(
  checkable,
)(input)

class Test extends PureComponent {
  render() {
    return <div>
      <Form ref='form'>
        <Input name='a' pattern='abc' required placeholder='输入"abc"才是正确的值'/>
        <input name='b' placeholder='这个框的值不参与校验' />
      </Form>
      <button onClick={()=>{
        const a = this.refs.form.validity()
        console.log('a', a)
      }}>show</button>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

