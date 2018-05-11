/*
 * 用rx.js对拖动事件进行封装
 * TODO: 后续可以站在控件的角度，进一步实现controlled或者是uncontrolled的draggable control
 */
import { PureComponent } from 'react'
import {drag} from '../../rx.js'

export default class Draggable extends PureComponent {
  componentDidMount(){
    // onDragging different from built-in onDrag
    drag(this).subscribe(this.props.onDragging) 
  }

  render() {
    return this.props.children
  }
}
