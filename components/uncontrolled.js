/*
 * 将一个controlled的组件包装成uncontrolled的形式
 * 其实跟之前的所谓p->s模式有一点类似。但这次不提之前的概念，而是从'控件'的角度来重新诠释其中的设计思想
 */

import React, { PureComponent } from 'react'
import {displayName} from './displayName.js'

export function free(Controlled){

  class Uncontrolled extends PureComponent{
    constructor(p) {
      super(p)
      const {value} = this.props
      this.state = { value, }
    }

    static displayName = `free(${displayName(Controlled)})`

    componentWillReceiveProps(np) {
      const {value} = np
      this.setState({ value, })
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
      if ( onChange ) {
        console.warn('freed component should not have onChange property')
      } 
      const {value} = this.state 

      return <Controlled {...{...rest, value, onChange:v=>this.setState({ value:v })}}/>
    }
  }

  return Uncontrolled
}
