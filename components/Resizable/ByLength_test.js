// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

import Resizable from './utils/components/Resizable/ByLength.js'

class Test extends PureComponent {
  render() {
    /*
     * 演示通过 ByLength类型的Resizable来演示只能拖动右边、右下角来改变宽度的组件
     * 0xc表示 右 + 右下
     */
    return <Resizable direction={0xc} width={100} style={{
      height : 100,
      minWidth : 50, // 直接在style里指定minWidth可以限定拖动的范围
      backgroundColor : 'aliceblue',
    }} />
  }
}

render(<Test />
  , document.getElementById('root'))

