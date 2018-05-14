// React 
/*
 * uncontrolled形式的localStoragify
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'

import {localStoragify} from './utils/components/localStoragify/index.js'
import {free} from './utils/components/Formy/uncontrolled.js'

import input from './utils/components/Formy/Input.js'
const Input = _.flow(localStoragify()('local_storagify_uncontrolled'), free)(input)

class Test extends PureComponent {
  render() {
    /*
     * 对于uncontrolled的形式，直接丢一个控件进来，它就可以自己与localStorage同步
     * 注：uncontrolled传的value为初始value
     */
    return <div>
      <Input value='' />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

