import React from 'react'
import { render } from 'react-dom'
import drag from './utils/rxjs/drag.js'

class Test extends React.PureComponent {
  state = {
    x : 0,
    y : 0,
  }

  componentDidMount(){
    drag(this.div).subscribe(({x,y})=>{
      x += this.state.x
      y += this.state.y
      this.setState({ 
        x, y,
      })
    })
  }

  render() {
    const {x, y} = this.state 
    return <div style={{
      width : 100,
      height : 100,
      background : 'gray',
      transform : `translate(${x}px, ${y}px)`,
    }} 
      ref={el=>this.div=el} 
    ></div>
  }
}

render(<Test />, document.getElementById('root'))
