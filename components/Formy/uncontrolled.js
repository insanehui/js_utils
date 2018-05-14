/*
 * 将一个controlled的组件包装成uncontrolled的形式
 * 其实跟之前的所谓p->s模式有一点类似。但这次不提之前的概念，而是从'控件'的角度来重新诠释其中的设计思想
 */

import React, { PureComponent } from 'react'
import displayName from '../displayName/get.js'

export function free(Controlled){

  class Uncontrolled extends PureComponent{
    constructor(p) {
      super(p)
      const {value} = this.props
      this.state = { value, }
    }

    static displayName = `free(${displayName(Controlled)})`

    static defaultProps = {
      onChange : ()=>{},
    }

    /*
     * 这里的实现模式可能存在争议：根据React的控件模式
     * 对于uncontrolled的组件，是不能通过传入value改变其值，因为这样它就变成controlled了
     * 基于这个设计原则，暂时将此处注释掉
     */
    // componentWillReceiveProps(np) {
    //   const {value} = np
    //   this.setState({ value, })
    // }

    /*
     * 通过对外api来设置value，才是一个地道的uncontrolled组件
     */
    set value(val){
      this.setState({ value:val })
    }

    get value(){
      return this.state.value
    }

    render(){
      /*
       * 根据React提倡的设计原则，随意地变换控件的control类型是不好的
       * 因此这里限定：被free了的控件，不能再传入onChange
       */
      const {onChange, ...rest} = this.props
      const {value} = this.state 

      return <Controlled {...{...rest, value, onChange:v=>this.setState({ value:v }, ()=>onChange(v))}}/>
    }
  }

  return Uncontrolled
}
