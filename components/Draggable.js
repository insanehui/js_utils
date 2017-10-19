/*
 * 可拖动的组件
 * 适用于简单拖动的场景. 对于稍微复杂的拖动，建议使用rx工具函数直接操作事件
 */
import React, { PureComponent, Children } from 'react'

export default class Draggable extends PureComponent {
  render() {
    // TODO: 由于拖动的代码太简单，似乎暂时还没有封装该组件的必要
    const {children} = this.props
    return Children.only(children)
  }
}
