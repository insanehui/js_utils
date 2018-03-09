/*
 * 一个根据长度width或者height来进行调整的resizable组件。为uncontrolled组件
 * 如果需要controlled的功能，请直接使用原始的Resizable
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'

import Resizable from '../Resizable.js'

export default class LengthResizable extends PureComponent {
  state = {
    /*
     * width和height不一定全部被用到，取决于传入的属性
     */
    width : undefined,
    height : undefined,
  }

  get widthOn(){
    const {width} = this.state 
    return width !== undefined
  }

  get heightOn(){
    const {height} = this.state 
    return height !== undefined
  }

  componentDidMount(){
    const {width, height} = this.props
    // 作一部分的p -> s
    if ( width !== undefined ) {
      this.setState({ width })
    } 
    if ( height !== undefined ) {
      this.setState({height})
    } 
  }

  updateWidth = (to, x)=>{
    /*
     * 注：这里的to命名取得不好，并不是真正拖动的方向，而是被拖动的部位相对于部件中心的方位
     */
    const {widthOn} = this
    if ( !widthOn ) {
      return
    } 
    let {width} = this.state 
    if ( to.includes('right') ) { // 这里指右边界被拖动
      width += x
    } 
    if ( to.includes('left') ) {
      width -= x
    } 
    this.setState({ width })
  }

  updateHeight = (to, y)=>{
    const {heightOn} = this
    if ( !heightOn ) {
      return
    } 
    let {height} = this.state 
    if ( to.includes('bottom') ) { // 这里指右边界被拖动
      height += y
    } 
    if ( to.includes('top') ) {
      height -= y
    } 
    this.setState({ height })
  }

  onResize = ({to, x, y})=>{
    this.updateWidth(to, x)
    this.updateHeight(to, y)
  }

  render() {
    const {width, height, style, ...rest} = this.props
    const {onResize} = this

    const p = {
      ...rest,
      style : {
        ...style,
        ..._.pickBy(this.state, x=>x !== undefined),
      },
      onResize,
    }

    return <Resizable {...p} />
  }
}
