import React from 'react'
import { render } from 'react-dom'

import popupKit from './utils/components/Dialog/UIKit.js'

const {prompt} = popupKit()

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      const res = await prompt('请输入你的名字', 'tc')
      console.log('res', res)
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
