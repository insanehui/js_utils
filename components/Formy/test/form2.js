/*
 * 表单密码一致校验
 */
import React, { PureComponent, Fragment as F} from 'react'
import _ from 'lodash'
import {compose} from 'ramda'

import {render} from 'react-dom'
import {free as Form} from './utils/components/Formy/Form.js'
import {bindState as $} from './utils/components/Formy/validation/checker.js'
import {change} from './utils/components/Formy/validation/validateOn.js'
import {Input as reactor} from './utils/components/Formy/validation/reactor.js'

const R = reactor((C, {valid, msg})=>{
  return <F>
    <C />
    {!valid && <span style={{color:'red'}} >{msg || '请输入正确的值'}</span>}
  </F>
})

const Input = compose(
  change,
)(R)

class Test extends PureComponent {
  onChange = ()=>{
    const {form} = this.refs
    const {value:{password:v, password2:v2}} = form
    if ( v && v2 && (v !== v2) ) {
      form.checkValidity({msg:'两次输入的密码不一致'}, 'password2')
    } 
  }

  render() {
    const valid = _.get(this.state, 'valid')
    const {onChange} = this

    return <Form ref='form' {...$(this)({valid:1})} >
      <Input type='password' name='password' required placeholder='输入密码' onChange={onChange} />
      <br />
      <Input type='password' name='password2' required placeholder='确认密码' onChange={onChange} />
      <br />
      <button disabled={!valid} onClick={()=>window.alert(JSON.stringify(this.refs.form.value, null, '  '))}>提交</button>
    </Form>
  }
}

render(<Test /> , document.getElementById('root'))


