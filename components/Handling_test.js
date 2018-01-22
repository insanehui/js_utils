// React 
import React, { PureComponent } from 'react'
import {render, } from 'react-dom'
import Handling from './utils/components/Handling.js'
import {ptimeout} from './utils/modash.js'

class Test extends PureComponent {
  onClick = async e=>{
    console.log('begin')
    await ptimeout(1000)
    console.log('end')
  }

  render() {
    return <Handling as='button' onClick={this.onClick}>
      {({onClick:pending})=> (pending ? '处理中...' : '点我')}
    </Handling>
  }
}

render(<Test />
  , document.getElementById('root'))

