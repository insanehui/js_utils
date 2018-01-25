// React 
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import Form from './utils/components/Formy.js'

class Test extends PureComponent {

  state = {
    aa : 'haha',
    bb : 'heihei',
    cc : true,
  }

  render() {
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Form value={this.state} onChange={v=>{this.setState(v)}}>
        <input name='aa' />
        <input name='bb' />
        <input type='checkbox' name='cc'/>
        <div> fuck </div>
        <div> shit </div>
        <div> cow </div>
      </Form>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

