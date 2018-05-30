import React, { PureComponent, Component} from 'react'
import { render } from 'react-dom'
import injectSheet from 'react-jss'

import {H, V} from './utils/components/Flex.js'

import {TopInsertable, LeftInsertable} from './utils/components/Insertable.js'

class Design extends PureComponent {
  render() {
    return <div>
      <H>
        <LeftInsertable>
          <V>
            <TopInsertable>
              <div style={{
                height : 30,
                width : 100,
                border : '1px solid gray',
                marginTop : 4,
              }}>
                aa
              </div>
            </TopInsertable>
            <TopInsertable>
              <div style={{
                height : 30,
                width : 100,
                border : '1px solid gray',
                marginTop : 4,
              }}>
                bb
              </div>
            </TopInsertable>
          </V>
        </LeftInsertable>
        <LeftInsertable>
          <V>
            <TopInsertable>
              <div style={{
                height : 30,
                width : 100,
                border : '1px solid gray',
                marginTop : 4,
              }}>
                aa
              </div>
            </TopInsertable>
            <TopInsertable>
              <div style={{
                height : 30,
                width : 100,
                border : '1px solid gray',
                marginTop : 4,
              }}>
                bb
              </div>
            </TopInsertable>
          </V>
        </LeftInsertable>
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

