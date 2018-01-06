// React 
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import injectSheet from 'react-jss'

import Ellipsis from './utils/components/Ellipsis.js'

@injectSheet({
  cmain : {
    backgroundColor : 'cyan',
    width : 100,
    height : 100,
  },
})
class Test extends PureComponent {
  componentDidMount(){
  }

  render() {
    const {classes:{cmain}} = this.props
    return <Ellipsis className={cmain}>
本课程介绍了数字化业务创新的背景下，云服务开发技术方面的知识，如前端开发语言基础、后端开发语言基础、敏捷开发基础、开
本课程介绍了VoLTE业务相关的IMS技术与信令流程，EPC网络原理，SIP协议，VoLTE部署与关键特性等，让学员
    </Ellipsis>
  }
}

render(<Test />
  , document.getElementById('root'))

