import React, { PureComponent } from 'react'
import { render } from 'react-dom'

import popup from './utils/components/Dialog/popup.js'
import suite from './utils/components/Dialog/Suite.js'

const {Main, Title, Cancel, Confirm, Content} = suite()

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
      </Content>
      <Confirm as='button'>确定</Confirm>
    </Main>
  }
}

const dialog = () =>{
  return popup({aa:'你好'}, Dialog)
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
