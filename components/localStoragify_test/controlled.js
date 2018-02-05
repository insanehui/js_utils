// React 
/*
 * controlled形式的localStoragify
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'

import {localStoragify} from './utils/components/localStoragify.js'
import {valuefy} from './utils/components/valuefy.js'

const Input = _.flow(valuefy, localStoragify()('local_storagify_controlled'))('input')

class Test extends PureComponent {
  state = {
    value : '初始值',
  }

  render() {
    const {value} = this.state 
    return <div>
      <Input value={value} onChange={v=>this.setState({ value:v })}/>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

