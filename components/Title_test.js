// React 
import React, { PureComponent,} from 'react'
import {render, } from 'react-dom'
import Title from './utils/components/Title.js'

class Test extends PureComponent {
  render() {
    return <div style={{
      width: 100,
      height : 100,
      backgroundColor : 'aliceblue',
    }} >
    <Title style={{ backgroundColor : 'white', padding:5, border : '1px solid rgb(118,118,118)', fontSize:8}}>
      <div>Title测试</div>
    </Title>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

