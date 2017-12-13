/*
 * 用来实现小弹框UI的组件
 */

import React, { PureComponent } from 'react'
import {createPortal} from 'react-dom'

function Cover({z, ...p}) {
  return <div {...p} style={{
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    zIndex : z,
  }} />
}

/*
 * 只接受children（同时要求children.count === 2），以及外层元素的一些属性
 * 虽然有点晦涩，但是这样最方便使用
 */
export default class Toggle extends PureComponent {

  state = {
    on : false,
  }

  constructor(p) {
    super(p)
    // portal的dom元素要在构造器中准备好，如果放到componentDidMount中的话，已经晚了
    this.cover = document.createElement('div') 

    // 这行代码是该放在constructor还是componentDidMount里？各有什么区别？
    document.body.prepend(this.cover)
  }

  componentWillUnmount(){
    document.body.removeChild(this.cover)
  }

  render() {
    const z0 = 99
    const {children, tag:Tag = 'div', zIndexCover = z0, zIndexPopup = z0+1,  ...forward} = this.props
    const {on} = this.state 

    let [A,B] = React.Children.toArray(children) 

    A = React.cloneElement(A, {
      onClick : e=> this.setState({ on : !on }),
      style : {
        userSelect : 'none',
        ...A.props.style,
      }
    })

    B = React.cloneElement(B, {
      onClick : e=>e.stopPropagation(),
      style : {
        zIndex : zIndexPopup,
        ...B.props.style,
      }
    })

    return <Tag {...forward}>
      {A}
      {on && createPortal(<Cover z={zIndexCover} onClick={e=>this.setState({ on : false })}/>, this.cover)}
      {on && B}
    </Tag>
  }
}

