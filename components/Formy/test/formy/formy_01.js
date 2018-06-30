/*
 * formy的最简单示例
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import Form from './utils/components/Formy/Form.js'

class Test extends PureComponent {
  state = {
    aa : 'haha',
  }

  render() {
    return <div>
      <Form value={this.state} onChange={v=>{this.setState(v)}}>
        <input name='aa' />
        <div>这里不受formy影响</div>
      </Form>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

