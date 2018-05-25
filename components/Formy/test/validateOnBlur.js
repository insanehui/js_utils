// React 
import React, { PureComponent} from 'react'
import {compose} from 'ramda'

import {render} from 'react-dom'
import {Input as input} from './utils/components/Formy/validation/checker.js'
import reactor from './utils/components/Formy/validation/reactor.js'
import {validatable as free} from './utils/components/Formy/uncontrolled.js'
import onBlur from './utils/components/Formy/validation/validateOnBlur.js'

const V = reactor((El, props, ref, invalid,)=>{
  return <El {...props} ref={ref} style={{
    borderColor : invalid ? 'red' : 'gray',
  }} />
})

const Input = compose(
  onBlur, free, // 这两者是可以交换顺序的
  V,
)(input)

class Test extends PureComponent {

  render() {
    return <div>
      <Input ref='input' pattern='aa' required placeholder='请输入"aa"' />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

