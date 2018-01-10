// React 
import React, { PureComponent } from 'react'
import {findDOMNode} from 'react-dom'
import _ from 'lodash'

import {str_ellipsis, 
  // ptimeout
} from '../modash.js'
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

  static defaultProps = {
    maxLen : 1000,
  }

  async componentDidMount(){
    this.me = findDOMNode(this)
    await this.ellipsis()
  }

  ellipsis = _.debounce(async ()=>{
    /*
     * 这里的debounce非常精髓！不加这一个的话，对于需要频繁调整ui尺寸的界面，会卡死
     */
    await adjust(this.check, {returnCheck:true})

    // 由于被浏览器一直警告性能的问题，先不用定时器了
    // await ptimeout(1000)
    // return this.ellipsis()
  }, 500)

  refContent = el=>{
    this.content = el
  }

  check = async l => { // 传入新的l
    if ( !this.me ) {
      return 0
    } 
    const {maxLen} = this.props
    if ( l > maxLen ) { 
      return 1
    } 
    let text = this.props.children
    text = str_ellipsis(text, l)

    return new Promise(ok=>{
      this.setState({ text, l }, ()=>{
        ok(this.content.scrollHeight - this.me.clientHeight)
      })
    })
  }

  componentWillReceiveProps(np) {
    // this.setState({ text : np.children }) // legacy
    this.ellipsis()
  }

  componentWillUnmount(){
    this.me = null
  }

  render() {
    const {text} = this.state 
    const {children, 
      maxLen, // filter
      ...rest} = this.props
    return <div {...rest}>
      <div ref={this.refContent}>
        {text}
      </div>
    </div>
  }
}
