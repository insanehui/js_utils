// React 
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import Form from './utils/components/Formy/Form.js'
import Check from './utils/components/CheckboxSelect.js'

class Test extends PureComponent {

  state = {
    aa : 'haha',
    bb : 'heihei',
    sub : {
      cc : true,
      ee : 'ohoh',
    },
  }

  render() {
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Form value={this.state} onChange={v=>{this.setState(v)}}>
        <input name='aa' />
        <div>
          <input name='bb' />
          <input type='checkbox' name='ac'/>
          {/* 试一下自定义的组件 */}
          <Check name='dd' on='haha' off='heihei' />
        </div>
        {/* 支持嵌套 */}
        <Form name='sub'>
          <input type='checkbox' name='cc'/>
          <input name='ee' />
        </Form>
        <div> aaa </div>
        <div> bbb </div>
      </Form>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

