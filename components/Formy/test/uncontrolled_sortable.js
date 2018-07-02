// React 
/*
 * 演示如何结合free和sortable
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Sortable from './utils/components/Sortable.js'
import {free} from './utils/components/Formy/uncontrolled.js'

const FreeSort = free(Sortable)

const initValue = [ 'a', 'b', 'c', 'd', ]

class Test extends PureComponent {
  state = {
    value : initValue
  }

  render() {
    const {value} = this.state 
    /*
     * free的神奇功效：原本是controlled控件的Sortable，被free了之后，就可以直接丢给它一个value
     * 它就可以生活自理了（自己管理状态）
     * 外界通过实例暴露的value来读取、修改其状态
     * onChange事件仍然可用
     */
    return <div>
      <button onClick={e=>console.log('value', this.refs.sortable.value)}>查看</button>
      <button onClick={e=>this.refs.sortable.value=initValue}>重置</button>
      <FreeSort value={value} ref='sortable' onChange={v=>console.log('changed', v)}>
        {({value})=><div> {value} </div>}
      </FreeSort>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

