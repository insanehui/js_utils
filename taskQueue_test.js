// React 
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import EventEmitter from 'events'

import {ptimeout} from './utils/modash.js'
import './utils/css_preset.js'
import newQueue from './utils/taskQueue.js'

let c = 0

const t1 = async ()=>{
  c++
  console.log(`${c} begin`)
  await ptimeout(1000)
  console.log(`${c} done`)
}

const queue = newQueue()

const store = new EventEmitter()

class Test extends PureComponent {

  normal = e=>{
    queue(t1)
  }

  special = e=>{
    queue(()=>{
      return new Promise((ok, err)=>{
        c++
        console.log(`${c} special begin`)
        store.once('done', ()=>{
          console.log(`${c} special done`)
          ok()
        })
      })
    })
  }

  specialDone = e=>{
    store.emit('done')
  }

  render() {
    return <div>
      {/* 模拟一个普通的任务：1秒后任务完成 */}
      <button onClick={this.normal}>添加任务到队列</button>
      {/* 特殊任务开始之后，需要手动点'完成'才会结束，这种情况下，queue也能管理 */}
      <button onClick={this.special}>添加特殊任务</button>
      <button onClick={this.specialDone}>完成特殊任务</button>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

