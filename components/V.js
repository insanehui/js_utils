// 垂直布局
import React, { PureComponent } from 'react'
import Div from './Div.js'

class V extends PureComponent {
  render() {
    const p = this.props 
    const style = {
      flexDirection: 'column',
      ...p.style,
    }
    return <Div {...p} style={style} />
  }
}

export default V

