// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import injectSheet from 'react-jss'
import FlexImg from './utils/components/FlexImg.js'

@injectSheet({
  cimg : {
    '&:hover' : {
      transform : `scale(1.5)`,
    },
  },
})
class Test extends PureComponent {
  render() {
    const {classes:{cimg}} = this.props
    return <div style={{
      width : 105,
      height : 60,
      overflow : 'hidden',
    }} >
      <FlexImg className={cimg} src='http://localhost:8085/news/b1.png' style={{
        transition : '0.4s',
        width : '100%',
        height : '100%',
      }} />
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

