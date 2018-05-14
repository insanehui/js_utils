/*
 * 用rx.js对拖动事件进行封装
 * TODO: 后续可以站在控件的角度，进一步实现controlled或者是uncontrolled的draggable control
 */
import { PureComponent } from 'react'
// import _ from 'lodash'
import {drag} from '../../rx.js'
import hocName from '../displayName/hoc.js'

export default class Draggable extends PureComponent {
  componentDidMount(){
    // onDragging different from built-in onDrag
    drag(this).subscribe(this.props.onDragging) 
  }

  render() {
    return this.props.children
  }
}

/*
 * 提供一个dragMe装饰器来对接父组件的state
 */
export const dragMe = base => {
  class Cmp extends base {
    constructor(p) {
      super(p)
      this.onDragging = (xKey, yKey) => ({x,y})=>{
        // let fx = 1
        // let fy = 1
        // if ( _.isArray() ) {
        // } 
      }
    }
  }
  Cmp.displayName = hocName(base, 'dragMe', 'dg')
  return Cmp
}

Draggable.dragMe = dragMe
