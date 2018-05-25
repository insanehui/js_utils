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
      this[eventName] = e=>{
        const {[eventName]:handler} = this.props
        this.inner.checkValidity()
        handler(e)
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
      return <Cmp {...{...this.props, [eventName]:handler}} ref={forwardedRef || localRef } />
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
