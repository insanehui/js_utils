/*
 * 测试bind to state
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import {Input} from './utils/components/Formy/Adapted.js'
import stateBind, {bindState} from './utils/components/utils/bindToState.js'

@stateBind()
class Test extends PureComponent {
  render() {
    const {bindState:bind} = this
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
    <Input {...bind('value')} ref='input' />
      <Input {...bindState(this)('value2')}/>
      <button onClick={()=>{
        console.log(this.refs.input.value)
      }}>点我</button>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

