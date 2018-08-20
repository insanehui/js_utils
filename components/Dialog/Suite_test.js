import React, { PureComponent } from 'react'
import { render } from 'react-dom'

import popup from './utils/components/Dialog/popup.js'
import suite from './utils/components/Dialog/Suite.js'

const {Dialog, Title, Close} = suite()

class Alert extends PureComponent {
  render() {
    const {onChange} = this.props
    return <Dialog onChange={onChange}>
      <Title>
        这是标题
        <Close as='button'>关闭</Close>
      </Title>
      <div>
        哈哈哈
      </div>
    </Dialog>
  }
}

const dialog = () =>{
  return popup(null, Alert)
}

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      await dialog()
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
