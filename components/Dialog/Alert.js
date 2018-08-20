/*
 * 代替window.alert
 */
import React, { PureComponent } from 'react'
import prompt from '../Prompt.js'

import suite from './Suite.js'

const {Dialog, Title} = suite()

class Alert extends PureComponent {
  render() {
    const {onChange, value} = this.props

    return <Dialog onClose={onChange}>
      <Title>
        提示
      </Title>
      <div>
        {value}
      </div>
      <footer>
        <button onClick={onChange}>确定</button>
      </footer>
    </Dialog>
  }
}

export default msg=>{
  return prompt(msg, Alert)
}
