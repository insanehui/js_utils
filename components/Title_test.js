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
    <Title style={{ 
      // 模仿chrome title的样式
      backgroundColor : 'white', padding:5, border : '1px solid rgb(118,118,118)', fontSize:8,
      width : 100
    }}>
      <div>Title测试</div>
      <div style={{textAlign:'right'}} >
        <a href='http://www.baidu.com' target='_blank'>详情</a>
      </div>
    </Title>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

