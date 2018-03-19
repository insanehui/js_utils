// React
import React, { PureComponent } from 'react'
import {render} from 'react-dom'

import Title from './utils/components/Title/Portal.js'

class Test extends PureComponent {
  render() {
    return <svg style={{
      width: 400,
      height : 400,
      backgroundColor : 'aliceblue',
    }} >
      <Title title={
      <div style={{ 
        // 模仿chrome title的样式
        backgroundColor : 'white', padding:5, border : '1px solid rgb(118,118,118)', fontSize:8,
        width : 100
      }}>
        <div>Title测试</div>
        <div style={{textAlign:'right'}} >
          <a href='http://www.baidu.com' target='_blank' rel='noopener noreferrer'>详情</a>
        </div>
      </div>
    }>
        <line x1={100} y1={100} x2={200} y2={200} stroke='red' strokeWidth={3}/>
      </Title>
    </svg>
  }
}

render(<Test />
  , document.getElementById('root'))

