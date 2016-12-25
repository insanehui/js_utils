// 一个带有flex属性的div
import React, { PureComponent } from 'react'

class Div extends PureComponent {
  render() {
    const p = this.props 
    const style = {
      display: 'flex',
      ...p.style,
    }
    return <div {...p} style={style} />
  }
}

export default Div

