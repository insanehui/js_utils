// 水平布局
// [deprecated]，新的代码不要再使用，用Flex.js来代替
import React, { PureComponent } from 'react'
import Div from './Div.js'

class H extends PureComponent {
  render() {
    const p = this.props 
    const style = {
      flexDirection: 'row',
      ...p.style,
    }
    return <Div {...p} style={style} />
  }
}

export default H

