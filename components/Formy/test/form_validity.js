/*
 * 演示使用form的validity
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'
import {compose} from 'ramda'

import form from './utils/components/Formy/Form.js'
import {validatify, validatable} from './utils/components/Formy/Validatable.js'
import {Input as input} from './utils/components/Formy/Adapted.js'
import {free} from './utils/components/Formy/uncontrolled.js'
const Form = free(form, 'validity')

const Input = compose(
  validatify,
)(input)

class Test extends PureComponent {
  render() {
    return <div>
      <Form ref='form'>
        <Input name='a' pattern='abc' required />
        <input name='b' />
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

