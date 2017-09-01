/*
 * 在原生的foreignObject基础上，令其可自动伸缩，主要用于解决firefox上越界的元素不能正常显示的问题
 */
import React, { Component } from 'react'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import _ from 'lodash'

class ForeignObject extends Component {

  state = {
    width: 10, // 10只是随便一个数，刻意避免一些边界值，比如0
    height: 10,
  }

  child = null

  componentDidMount(){
    console.log("foreign mount")
    new ResizeSensor(this.child, this.update)
      // this.update()
      // console.log('Changed to ' + this.ref.clientWidth)
  }

  // componentWillReceiveProps(np){
  //   console.log("foreign update")
  //   this.update()
  // }

  // componentWillUnmount(){
  //   console.log("foreign unmount")
  // }

  update = ()=>{
    const {width, height} = this.child.getBoundingClientRect()
    console.log("foreign update", width, height)
    this.setState({ width, height })
  }

  render() {

    const props = {
      overflow : 'visible',
      ref : el=>this.child = _.get(el, 'firstChild.firstChild'),
      ...this.state, 
      ...this.props
    }
    return <foreignObject {...props}/>
  }
}

export default ForeignObject


