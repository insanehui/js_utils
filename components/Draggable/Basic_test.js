// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'
import Draggable from './utils/components/Draggable/Basic.js'

class Test extends PureComponent {

  state = {
    dx : 0,
    dy : 0,
  }

  render() {
    const {dx, dy} = this.state 
    return <Draggable onDragging={({x, y})=>{
      const {dx, dy} = this.state 
      this.setState({ dx:dx+x, dy:dy+y })
    }}>
      <div style={{ 
        width : 100,
        height : 100,
        backgroundColor : 'yellow',
        cursor : '-webkit-grab',
        transform : `translate(${dx}px, ${dy}px)`,
      }}>
      </div>
    </Draggable>
  }
}

render(<Test />
  , document.getElementById('root'))

