/*
 * 用来实现异步请求数据的组件
 * 用法：
 * <Async data={函数}><xxx /></Async>
 */
import React from 'react'
import _ from 'lodash'

// import {ptimeout} from '../../modash.js'
let i = 0
function number() {
  i++
  return i
}

export default class Async extends React.PureComponent {
  state = { }

  constructor(p) {
    super(p)
    /*
     * 作为刷新的序号，用来避免前面的请求把后面的覆盖
     */
    this.seq = 0 
  }

  // 选出所有作为函数的属性
  get funcs(){
    const {children, ...props} = this.props
    const funcs = _.pickBy(props, _.isFunction)
    return funcs
  }

  // 把所有的函数都调用一遍
  refresh = async ()=>{
    const ps = _.map(this.funcs, async (func, key)=>{
      const res = await func()
      return [key, res]
    })
    const seq = number()
    const pairs = await Promise.all(ps)
    if ( this.seq < seq ) {
      const state = _.fromPairs(pairs)
      this.setState(state)
      this.seq = seq
    } 
  }

  componentDidMount(){
    this.refresh()
  }

  componentDidUpdate(pp, ps, snapshot){
    if ( !_.isEqual(pp, this.props) ) {
      this.refresh()
    } 
  }

  render() {
    const {children} = this.props
    /*
     * 提供一个refresh方法给子元素方便其自主刷新
     */
    const {refresh} = this
    return React.cloneElement(children, {...this.props, ...this.state, refresh})
  }
}

