// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import injectSheet from 'react-jss'
import Img from './utils/components/BImg.js'

@injectSheet({
  cimg : {
    transition : '0.4s',
    width : '100%',
    height : '100%',
    '&:hover' : {
      transform : `scale(1.5)`,
    },
  },
  cdiv : {
    width : 105,
    height : 60,
    overflow : 'hidden',
    margin : 10,
  },
})
class Test extends PureComponent {
  render() {
    const {classes:{cimg, cdiv}} = this.props
    return <div>
      <div className={cdiv}> <Img className={cimg} src='http://localhost:8085/news/b1.png' /> </div>
      <div className={cdiv}> <Img className={cimg} cover src='http://localhost:8085/news/b1.png' /> </div>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

