/*
 * 测试bind to state
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import {Input} from './utils/components/Formy/Adapted.js'
import stateBind from './utils/components/utils/bindToState.js'

@stateBind()
class Test extends PureComponent {
  render() {
    const {bindState} = this
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Input {...bindState('value')}/>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

