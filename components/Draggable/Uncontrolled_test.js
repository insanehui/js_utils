import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

import {Uncontrolled as Draggable} from './utils/components/Draggable/Control.js'

class Test extends PureComponent {
  render() {
    return <Draggable>
      <div style={{
        width: 100, height : 100, backgroundColor : '#ccc',
      }} />
    </Draggable>
  }
}

render(<Test /> , document.getElementById('root'))

