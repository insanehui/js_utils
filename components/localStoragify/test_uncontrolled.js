// React 
/*
 * uncontrolled形式的localStoragify
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'

import {localStoragify} from './utils/components/localStoragify/index.js'
import {valuefy} from './utils/components/Formy/valuefy.js'
import {free} from './utils/components/Formy/uncontrolled.js'

const Input = _.flow(valuefy, localStoragify()('mydata'), free)('input')

class Test extends PureComponent {
  render() {
    // 对于uncontrolled的形式，直接丢一个控件进来，它就可以自己与localStorage同步
    return <div>
      <Input />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

