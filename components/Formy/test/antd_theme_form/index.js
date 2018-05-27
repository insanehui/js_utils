/*
 * 演示复制antd里的第一个表单示例：逻辑 + 样式
 */
import React, { PureComponent} from 'react'
import _ from 'lodash'

import {render} from 'react-dom'
import {bindState as $} from './utils/components/Formy/validation/checker.js'
import {free as Form} from './utils/components/Formy/Form.js'

import {Input} from './UI.js'

class Test extends PureComponent {
  render() {
    const valid = _.get(this.state, 'valid')

    return <Form ref='form' {...$(this)({valid:1})} >
      <Input name='username' required placeholder='Username' tip='Please input your username!' />
      <Input name='password' required placeholder='Password' tip='Please input your Password!' />
      <button disabled={!valid} onClick={()=>window.alert(JSON.stringify(this.refs.form.value, null, '  '))}>提交</button>
    </Form>
  }
}

render(<Test /> , document.getElementById('root'))


