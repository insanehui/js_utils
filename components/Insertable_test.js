import React, { PureComponent, Component} from 'react'
import { render } from 'react-dom'
import injectSheet from 'react-jss'

import {H, V} from './utils/components/Flex.js'

import {TopInsertable, RightInsertable} from './utils/components/Insertable.js'

class Design extends PureComponent {
  render() {
    return <div>
      <H>
        <RightInsertable>
          <V>
            <TopInsertable>
              <div style={{
                height : 30,
                border : '1px solid gray',
              }} >
              这是个什么地方
            </div>
          </TopInsertable>
        </V>
      </RightInsertable>
    </H>
  </div>
  }
}

@injectSheet({
  main : {
    width: 300,
  }, 
  dragger : {
    backgroundColor : 'lightblue',
  },
})
class App extends Component {

  render() {
    const {classes:{main, dragger,}} = this.props

    return <div className={main}>
      <div className={dragger} draggable
        onDragStart={e=>{
          console.log('start')
        }}
      >
        请拖动我
      </div>
      <Design />
    </div>
  }
}

render(<App />, document.getElementById('root'))

