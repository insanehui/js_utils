/*
 * 对img的一个简单的包装，简单地消除一些兼容性问题
 */
import React, { PureComponent } from 'react'

class Base extends PureComponent {
  onDragStart = e=>{
    e.preventDefault()
    const {onDragStart} = this.props
    onDragStart && onDragStart(e)
  }
}

export class Img extends Base {
  render() {
    const {alt = '', onDragStart, ...forward} = this.props
    const p = {
      onDragStart : this.onDragStart,
      ...forward,
    }
    return <img alt={alt} {...p} />
  }
}

export class Image extends Base { // svg里的image
  render() {
    const {onDragStart, ...forward} = this.props
    const p = {
      onDragStart : this.onDragStart,
      ...forward,
    }
    return <image {...p} />
  }
}



