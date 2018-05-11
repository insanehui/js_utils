/*
 * 控件形式的Draggable
 */
import React, { PureComponent } from 'react'
import {drag} from '../../rx.js'

export default class DraggableControl extends PureComponent {
  static defaultProps = {
    value : {
      x : 0,
      y : 0,
    },
    onChange : ()=>{},
    as : 'div',
  }

  componentDidMount(){
    const {onChange} = this.props

    drag(this).subscribe(({x,y})=>{
      const {value:v} = this.props
      x+=v.x
      y+=v.y
      onChange({x,y})
    }) 
  }

  render() {
    const {as:As, value:{x,y}, children, } = this.props
    return <As {...{children, style : {
      position : 'fixed',
      transform : `translate(${x}px, ${y}px)`,
    }}} />
  }
}
