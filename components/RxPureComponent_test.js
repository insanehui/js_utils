// React
/*
 * 使用上自己封装的RxPureComponent
 */
import React, {PureComponent} from 'react'
import { render } from 'react-dom'
import RxPureComponent from './utils/components/RxPureComponent.js'

class Sub extends RxPureComponent {

  componentDidMount(){
    const {click, subscribe} = this
    const {button} = this.refs
    subscribe(click(button).startWith(1), () => console.log('Clicked!'))
  }

  render() {
    return <div>
      <button ref='button'>点击一下</button>
    </div>
  }
}

class App extends PureComponent {
  state = {
    on : false,
  }

  render() {
    const {on} = this.state 
    return <div>
      <button onClick={e=>this.setState({ on : !on })}>Toggle</button>
      {on && <Sub />}
    </div>
  }
}

render(<App />, document.getElementById('root'))

