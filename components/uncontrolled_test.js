// React 
/*
 * 演示如何结合free和sortable
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable.js'
import {free} from './utils/components/uncontrolled.js'

const FreeSort = free(Sortable)

class Test extends PureComponent {
  state = {
    value : [
      'a', 'b', 'c', 'd',
    ]
  }

  render() {
    const {value} = this.state 
    /*
     * free的神奇功效：原本是controlled控件的Sortable，被free了之后，就可以直接丢给它一个value
     * 它就可以生活自理了（自己管理状态）
     * 外界可以随时通过实例的value属性取到值
     */
    return <div>
      <button onClick={e=>console.log('value', this.refs.sortable.value)}>查看</button>
      <FreeSort value={value} ref='sortable'>
        {({value})=><div> {value} </div>}
      </FreeSort>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

