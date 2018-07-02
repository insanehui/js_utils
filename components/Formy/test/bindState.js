/*
 * 测试bind to state
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import {Input} from './utils/components/Formy/adaptor.js'
import bindState, {bindValueToState} from './utils/components/Formy/bindState.js'

@bindValueToState()
class Test extends PureComponent {
  render() {
    const {bindState:bind} = this
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Input {...bind('value')} ref='input' />
      <Input {...bindState(this)('value2')}/>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

