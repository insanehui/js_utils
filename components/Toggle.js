/*
 * 用来实现小弹框UI的组件
 */

import React, { PureComponent } from 'react'

function Cover(p) {
  return <div {...p} style={{
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
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

  render() {
    const {children, tag:Tag = 'div', ...forward} = this.props
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
        position : 'relative',
        ...B.props.style,
      }
    })

    return <Tag {...forward}>
      {A}
      {on && <Cover onClick={e=>this.setState({ on : false })}/>}
      {on && B}
    </Tag>
  }
}

