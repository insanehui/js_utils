// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable.js'

class Test extends PureComponent {
  state = {
    value : [
      'a', 'b', 'c', 'd',
    ]
  }

  render() {
    const {value} = this.state 
    return <Sortable value={value} onChange={v=>this.setState({ value:v })}>
      {({value:itemValue, onChange, sortIndex})=>{ 
        /*
         * 注入三个属性，onChange的作用是用于将局部的修改汇报给外层
         * 本例中没有用到，参见with_formy的例子
         */
        return <div>
          {itemValue}
        </div> 
      }}
    </Sortable>
  }
}

render(<Test />
  , document.getElementById('root'))

