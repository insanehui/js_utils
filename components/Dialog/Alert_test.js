import React from 'react'
import { render } from 'react-dom'

import Alert from './utils/components/Dialog/Alert.js'

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      await Alert('哈哈')
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
