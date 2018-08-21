import React from 'react'
import { render } from 'react-dom'

import popupKit from './utils/components/Dialog/UIKit.js'

const {alert} = popupKit()

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      await alert('你好吗')
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
