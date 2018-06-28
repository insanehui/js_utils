/*
 * 将一个controlled的组件包装成uncontrolled的形式
 * TODO: 改掉string类型的ref
 */

import React, { PureComponent } from 'react'
import _ from 'lodash'
import displayName from '../displayName/get.js'
import $ from '../../modash/bind.js'

export function free(Controlled, proxyMethods = ''){
  /*
   * proxyMethods 为逗号分隔的字符串，指要代理原组件的哪些实例方法
   */

  class Uncontrolled extends PureComponent{
    constructor(p) {
      super(p)
      const {value} = this.props
      this.state = { value, }
      /*
       * 注：代理内部对象的一些方法. 之所以要写成函数，是因为refs的数据在构造的时候，并没有产生
       * 如果写成this[prop] = this.refs.inner[prop]，执行的时候就会报undefined错误
       */
      for (const prop of proxyMethods.split(',')) {
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
      this._value = val // 维护一个inner value，是为了令外界能第一时间拿到value的变化值，如果从state取的话，会慢一拍
      this.setState({ value:val })
    }

    get value(){
      return this._value
    }

    render(){
      const {onChange, ...rest} = this.props
      const {value} = this.state 

      return <Controlled {...{...rest, value, ref:'inner', 
        onChange:v=>{
          this.value = v
          onChange(v, this)
        }
      }}
      />
    }
  }

  return Uncontrolled
}

/*
 * 桥接表单校验的一些方法
 * 桥接fields是方便快速引用子控件
 */
export const validatable = $(free, _, 'checkValidity,validity')
