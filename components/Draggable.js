/*
 * 用rx.js对拖动事件进行封装
 */
import { PureComponent } from 'react'
import {drag} from '../rx.js'

export default class Draggable extends PureComponent {
  componentDidMount(){
    // onDragging different from built-in onDrag
    drag(this).subscribe(this.props.onDragging) 
  }

  render() {
    return this.props.children
  }
}
