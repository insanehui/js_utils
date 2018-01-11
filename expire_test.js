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

class Test extends PureComponent {

  render() {
    return <div>
      {_.map(seq, v => {
        return <button key={v} onClick={async ()=>{
          /*
           * 首次点击会激活计时，如果5秒内不再点击的话，就会出现弹框
           */
          const {key} = await expireMgr.give(v)
          console.log(key)
        }}>{v}</button>
      })}
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

