// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

import Resizable from './utils/components/Resizable/ByLength.js'

class Test extends PureComponent {
  render() {
    return <Resizable direction={0xc} width={100} style={{
      height : 100,
      minWidth : 50,
      backgroundColor : 'aliceblue',
    }} />
  }
}

render(<Test />
  , document.getElementById('root'))

