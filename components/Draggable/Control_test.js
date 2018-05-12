// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

import Control from './utils/components/Draggable/Control.js'

class Test extends PureComponent {
  state = {
    value:{x:0, y:0},
  }

  render() {
    const {value} = this.state 
    return <Control {...{value, onChange:value=>{this.setState({value})}}}>
      <div style={{
        width: 100, height : 100, backgroundColor : '#ccc',
      }} />
    </Control>
  }
}

render(<Test /> , document.getElementById('root'))

