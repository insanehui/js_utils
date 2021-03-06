// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable/reactBeautifulDnd/Sortable.js'

class Test extends PureComponent {
  state = {
    value : [
      'a', 'b', 'c', 'd',
    ]
  }

  render() {
    const {value} = this.state 
    return <Sortable value={value} onChange={v=>this.setState({ value:v })}>
      {({value:itemValue})=>{ 
        return <div>
          {itemValue}
        </div> 
      }}
    </Sortable>
  }
}

render(<Test />
  , document.getElementById('root'))

