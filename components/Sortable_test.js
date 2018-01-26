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
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Sortable value={value} onChange={v=>this.setState({ value:v })}>
        {v=>(<div>
          {v}
        </div>)
        }
      </Sortable>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

