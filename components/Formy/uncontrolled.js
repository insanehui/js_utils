/*
 * 将一个controlled的组件包装成uncontrolled的形式
 * 其实跟之前的所谓p->s模式有一点类似。但这次不提之前的概念，而是从'控件'的角度来重新诠释其中的设计思想
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'
import displayName from '../displayName/get.js'
import $ from '../../modash/bind.js'

export function free(Controlled, refProps = ''){
  /*
   * refProps为逗号分隔的字符串
   */

  class Uncontrolled extends PureComponent{
    constructor(p) {
      super(p)
      const {value} = this.props
      this.state = { value, }
      /*
       * 代理内部对象的一些方法
       */
      for (const prop of refProps.split(',')) {
        this[prop] = (...p)=>this.refs.inner[prop](...p)
      }
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
      const {onChange, ...rest} = this.props
      const {value} = this.state 

      return <Controlled {...{...rest, value, ref:'inner', 
        onChange:v=>this.setState({ value:v }, ()=>onChange(v, this))
      }}
      />
    }
  }

  return Uncontrolled
}

export const validatable = $(free, _, 'checkValidity,validity')
