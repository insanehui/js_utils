// React 
import React, { PureComponent } from 'react'
import {findDOMNode} from 'react-dom'

import {str_ellipsis} from '../modash.js'
import '../css_preset.js'
import {adjust} from '../adjust.js'

/*
 * 一个可以自动Ellipsis组件. 
 * TODO: 定时刷新的方法效率较低，待优化
 */
export default class Ellipsis extends PureComponent {
  constructor(p) {
    super(p)
    this.state = {
      text : p.children // 要求只能是字符串
    }
  }

  async componentDidMount(){
    this.ellipsis()
    window.setInterval(this.ellipsis, 500)
  }

  ellipsis = ()=>{
    adjust(this.check, {returnCheck:true})
  }

  refContent = el=>{
    this.content = el
  }

  check = async l => { // 传入新的l
    let text = this.props.children
    text = str_ellipsis(text, l)

    return new Promise(ok=>{
      this.setState({ text, l }, ()=>{
        const me = findDOMNode(this)
        if ( !me ) {
          ok(0)
        } 
        ok(this.content.scrollHeight - me.clientHeight)
      })
    })
  }

  componentWillReceiveProps(np) {
    this.setState({ text : np.children })
  }

  render() {
    const {text} = this.state 
    const {children, ...rest} = this.props
    return <div {...rest}>
      <div ref={this.refContent}>
        {text}
      </div>
    </div>
  }
}
