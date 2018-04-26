// React
/*
 * 试验一下用一个组件作为title的情形
 */
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import Title from './utils/components/Title/Portal.js'

function Tip() {
  return <div>
    haha
  </div>
}

class Test extends PureComponent {
  render() {
    return <div style={{
      width: 400,
      height : 400,
      backgroundColor : 'aliceblue',
    }} >
    {/*
    <Title title={ <Tip /> }>
    */}
    <Title title={ <div>haha</div>}>
      <button>哈哈</button>
      </Title>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

