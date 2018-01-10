// React 
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import _ from 'lodash'

import './utils/css_preset.js'
import {createExpire} from './utils/expire.js'

const expireMgr = createExpire(i=>{
  return {
    key : i,
    clean : ()=>{
      alert(i)
    }
  }
}, 5000)

const seq = [1,2,3,4]

for (const i of seq) {
  expireMgr.create(i)
}

class Test extends PureComponent {

  render() {
    return <div>
      {_.map(seq, v => {
        return <button key={v} onClick={()=>{
          console.log(expireMgr.get(v).key)
        }}>{v}</button>
      })}
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

