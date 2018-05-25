/*
 * 在blur的时候进行validate
 */

import React, { PureComponent, forwardRef } from 'react'

/*
 * 要求Cmp为Validatable
 * 
 * 注：这里为了做到能forward ref，想了一个偏方:
 * 先把ref传给this保管一个，然后马上把外面的forward进来
 */
export default Cmp => {
  return forwardRef((props, ref)=>{
    class ValidateOnblur extends PureComponent {
      static defaultProps = {
        onBlur : x=>x,
      }

      state = {
        forwardedRef : null,
      }

      onBlur = e=>{
        const {onBlur} = this.props
        this.inner.checkValidity()
        onBlur(e)
      }

      localRef = el=>{
        if ( el ) {
          this.inner = el
        } 
        this.setState({ forwardedRef : ref })
      }

      render() {
        const {onBlur, localRef} = this
        const {forwardedRef} = this.state 
        return <Cmp {...this.props} ref={forwardedRef || localRef } onBlur={onBlur}/>
      }
    }
    return <ValidateOnblur {...props} />
  })
}
