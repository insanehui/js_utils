// React 
/*
 * 演示sortable的remove功能（方法）
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable/reactBeautifulDnd/Sortable.js'

class Test extends PureComponent {
  state = {
    value : [
      'a', 'b', 'c', 'd', 'e', 'f',
    ]
  }

  render() {
    const {value} = this.state 
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Sortable value={value} onChange={v=>this.setState({ value:v })}>
        {({value, remove})=>{ 
          return <div>
            {value} <button onClick={remove}>删除</button>
          </div> 
        }}
      </Sortable>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

