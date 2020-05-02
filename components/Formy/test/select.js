/*
 * 测试select
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import Select from './utils/components/Formy/Select.js'

class Test extends PureComponent {
  render() {
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
    <Select options={['a', 'b']} />
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

