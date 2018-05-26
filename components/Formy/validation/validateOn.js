/*
 * validate onblur, onchange等的基础函数
 */
import React, { PureComponent, forwardRef } from 'react'
import _ from 'lodash'

const maker = 
  /*
   * eventName: blur, change
   */
  eventName => 
  Cmp => {

  eventName = `on${_.capitalize(eventName)}`

  class ValidateOn extends PureComponent {
    constructor(p) {
      super(p)
      /*
       * 注：这里要用...p，否则会丢失onChange的第二个参数
       */
      this[eventName] = (...p)=>{
        const {[eventName]:handler} = this.props
        this.inner.checkValidity()
        handler(...p)
      }
    }

    static defaultProps = {
      [eventName] : x=>x,
      xRef : undefined,
    }

    state = {
      forwardedRef : null,
    }

    localRef = el=>{
      if ( el ) {
        this.inner = el
      } 
      this.setState({ forwardedRef : this.props.xRef })
    }

    render() {
      const {[eventName]:handler, localRef} = this
      const {forwardedRef} = this.state 
      const rest = _.omit(this.props, 'xRef')

      return <Cmp {...{...rest, [eventName]:handler}} ref={forwardedRef || localRef } />
    }
  }

  /*
   * 通过xRef来传递ref
   * 注：不能把class ValidateOn放入forwardRef里面，这样虽然可以不使用xRef属性，但会导致class每次实时构造（不稳定），进而导致dom被反复重载
   */
  return forwardRef((props, ref)=>{
    return <ValidateOn {...props} xRef={ref} />
  })
}

export default maker

export const blur = maker('blur')
export const change = maker('change')
