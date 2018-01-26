// React 
/*
 * 演示Sortable跟Formy结合使用
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable.js'
import Formy from './utils/components/Formy.js'

class Test extends PureComponent {
  state = {
    value : [
      {
        name : 'haha',
        age : 9,
      },
      {
        name : 'heihei',
        age : 6,
      },
      {
        name : 'hehe',
        age : 88,
      },
      {
        name : 'hoho',
        age : 73,
      },
    ]
  }

  render() {
    const {value} = this.state 
    return <Sortable value={value} onChange={v=>this.setState({ value:v })}>
      {item=>{ 
        return <div>
          <div style={{backgroundColor:'cyan'}} >
            项目
          </div>
          <Formy {...item}>
          <input name='name' />
          <input name='age' type='number'/>
        </Formy>
      </div> }}
    </Sortable>
  }
}

render(<Test />
  , document.getElementById('root'))

