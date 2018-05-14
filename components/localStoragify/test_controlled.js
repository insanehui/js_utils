// React 
/*
 * controlled形式的localStoragify
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import {localStoragify} from './utils/components/localStoragify/index.js'
import input from './utils/components/Formy/Input.js'
const Input = localStoragify()('local_storagify_controlled')(input)

class Test extends PureComponent {
  state = {
    value : '初始值',
  }

  render() {
    const {value} = this.state 
    return <div>
      <Input value={value} onChange={v=>this.setState({ value:v })}/>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

