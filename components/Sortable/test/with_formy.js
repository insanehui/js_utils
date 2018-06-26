// React 
/*
 * 演示Sortable跟Formy结合使用
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable.js'
import Formy from './utils/components/Formy/Form.js'

class Test extends PureComponent {
  state = {
    value : [
      {
        name : 'apple',
        age : 9,
      },
      {
        name : 'banana',
        age : 6,
      },
      {
        name : 'cherry',
        age : 88,
      },
      {
        name : 'durian',
        age : 73,
      },
    ]
  }

  render() {
    const {value} = this.state 
    return <div style={{width: 600}} >
        <Sortable value={value} onChange={v=>this.setState({ value:v })}>
        {({value, onChange})=>{ 
          return <div>
            <div style={{backgroundColor:'cyan'}} >
              项目
            </div>
            <Formy {...{value, onChange}}>
            <input name='name' />
            <input name='age' type='number'/>
          </Formy>
        </div> }}
      </Sortable>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

