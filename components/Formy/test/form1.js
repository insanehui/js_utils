/*
 * 复制antd表单示例里的第一个（最简单场景）
 */
import React, { PureComponent, Fragment as F} from 'react'
import _ from 'lodash'
import {compose} from 'ramda'

import {render} from 'react-dom'
import {free as Form} from './utils/components/Formy/Form.js'
import {bindState as $} from './utils/components/Formy/validation/checker.js'
import {change} from './utils/components/Formy/validation/validateOn.js'
import {Input as reactor} from './utils/components/Formy/validation/reactor.js'

const R = reactor((C, invalid)=>{
  return <F>
    <C />
    {invalid && <span style={{color:'red'}} >请输入正确的值</span>}
  </F>
})

const Input = compose(
  change,
)(R)

class Test extends PureComponent {
  render() {
    const valid = _.get(this.state, 'valid')

    return <Form ref='form' {...$(this)({valid:1})} >
      <Input name='a' pattern='aaa' required placeholder='输入"aaa"' />
      <Input name='b' pattern='bbb' required placeholder='输入"bbb"' />
      <input name='c' pattern='ccc' required placeholder='输入"ccc",此框不参与校验' />
      <button disabled={!valid} onClick={()=>window.alert(JSON.stringify(this.refs.form.value, null, '  '))}>提交</button>
    </Form>
  }
}

render(<Test /> , document.getElementById('root'))


