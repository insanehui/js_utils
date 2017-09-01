/*
 * [deprecated]
 * 本意是在原生的foreignObject基础上，令其可自动伸缩，主要用于解决firefox上越界的元素不能正常显示的问题
 * 最终由于foreignObject的浏览器兼容性极差，以及ResizeSensor也未考虑对foreignObject的支持，故放弃该方案
 */
import React, { Component } from 'react'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import _ from 'lodash'
import injectSheet from 'react-jss'


@injectSheet({
  sensor : {
    position : 'fixed',
  }, 
})
class ForeignObject extends Component {

  state = {
    width: 10, // 10只是随便一个数，刻意避免一些边界值，比如0
    height: 10,
  }

  child = null

  componentDidMount(){
    console.log("foreign mount")
    new ResizeSensor(this.child, this.update)
  }

  componentWillUnmount(){
    console.log("foreign unmount")
  }

  update = ()=>{
    if ( !this.child ) {
      return
    } 
    const {width, height} = this.child.getBoundingClientRect()
    console.log("foreign update", width, height)
    this.setState({ width, height })
  }

  render() {
    const {children, 
      classes:{sensor}, sheet,
      ...forward} = this.props

    const props = {
      overflow : 'visible',
      ref : el=>this.child = _.get(el, 'firstChild.firstChild'),
      ...this.state, 
      ...forward,
    }
    return <foreignObject {...props}>
      <div className={sensor}>
        {children}
      </div>
    </foreignObject>
  }
}

export default ForeignObject


