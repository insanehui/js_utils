import React from 'react'
import { render } from 'react-dom'

import popupKit from './utils/components/Dialog/UIKit.js'

const {confirm} = popupKit()

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      const res = await confirm('你好吗')
      console.log('res', res)
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
