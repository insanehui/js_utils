import React, { PureComponent } from 'react'
import { render } from 'react-dom'

import popup from './utils/components/Dialog/popup.js'
import suite from './utils/components/Dialog/Suite.js'

const {Main, Title, Cancel, OK, Content} = suite()

class Dialog extends PureComponent {
  render() {
    const {onChange, value} = this.props
    return <Main value={value} onChange={onChange}>
      <Title>
        这是标题
        <Cancel as='button'>关闭</Cancel>
      </Title>
      <Content>
        <input name='aa' />
        <input name='bb' />
      </Content>
      <OK as='button'>确定</OK>
    </Main>
  }
}

const dialog = () =>{
  return popup(null, Dialog)
}

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      const value = await dialog()
      console.log('value', value)
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
