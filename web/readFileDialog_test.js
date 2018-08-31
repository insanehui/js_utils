import React from 'react'
import { render } from 'react-dom'

import readFileDialog from './utils/web/readFileDialog.js'

class Test extends React.PureComponent {
  render() {
    return <button onClick={async ()=>{
      const res = await readFileDialog()
      console.log('res', res)
    }}>click</button>
  }
}

render(<Test />, document.getElementById('root'))
