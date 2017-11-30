// React
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import {activeStyle, Active} from './utils/components/ActiveX.js'

const sDiv = {
  width : 100,
  height : 100,
}

const A = activeStyle({
  '&:hover' : {
    backgroundColor : 'red', // 鼠标hover过去背景会变红
  },
  backgroundColor : 'green',
  ...sDiv,
})()

class Test extends PureComponent {
  render() {
    return <div>
      {/*************************
      普通hoc的style模式
      */}
      <A />
      {/**************************
      演示Active作为driver的模式，hover过去文字会改变
      */}
      <Active style={sDiv}>
        {({hovered})=>{
          return <div>
            {hovered ? 'Oh yeah!' : '移过来...'}
          </div>
        }}
      </Active>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

