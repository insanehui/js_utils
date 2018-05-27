/*
 * 表单密码一致校验
 */
import React, { PureComponent, Fragment as F} from 'react'
import _ from 'lodash'
import {compose} from 'ramda'

import {render} from 'react-dom'
import Form, {free as FormX} from './utils/components/Formy/Form.js'
import {change} from './utils/components/Formy/validation/validateOn.js'
import {bindState as $} from './utils/components/Formy/validation/checker.js'
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

// 封装
class Password extends PureComponent {
  onChange = (value, form)=>{
    const {password:v, password2:v2} = value
    if ( v && v2  ) {
      if ( v !== v2 ) {
        form.checkValidity({msg:'两次输入的密码不一致'}, 'password2')
      } 
      else {
        form.checkValidity(null, 'password2')
      }
    } 
    const {onChange} = this.props
    onChange(value, this)
  }

  // 如果不提供validity方法，则外层表单校验的时候将忽略当前组件
  validity = ()=>{
    return this.refs.form.validity()
  }

  render() {
    const {value} = this.props
    const {onChange} = this

    return <Form value={value} onChange={onChange} ref='form'>
      <Input type='password' name='password' required placeholder='输入密码' />
      <br />
      <Input type='password' name='password2' required placeholder='确认密码' />
    </Form>
  }
}

class Test extends PureComponent {
  render() {
    const valid = _.get(this.state, 'valid')

    return <FormX ref='form' {...$(this)({valid:1})}>
      <Input name='name' required pattern='aaa' placeholder='输入"aaa"' />
      <br />
      <Password name='pass' />
      <button disabled={!valid} onClick={()=>window.alert(JSON.stringify(this.refs.form.value, null, '  '))}>提交</button>
    </FormX>
  }
}

render(<Test /> , document.getElementById('root'))
