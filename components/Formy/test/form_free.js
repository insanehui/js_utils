/*
 * 演示uncontrolled form的用法
 */
import React, { PureComponent, } from 'react'
import {render} from 'react-dom'

import form from './utils/components/Formy/Form.js'
import {free} from './utils/components/Formy/uncontrolled.js'
import Check from './utils/components/CheckboxSelect.js'

const Form = free(form)

class Test extends PureComponent {
  render() {
    return <div style={{ 
      width : 800,
      height : 600,
    }}>
      <Form>
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
        <div> fuck </div>
        <div> shit </div>
        <div> cow </div>
      </Form>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

