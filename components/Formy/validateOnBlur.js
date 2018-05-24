/*
 * 在blur的时候进行validate
 */

import React, { PureComponent } from 'react'

/*
 * 要求Cmp为Validatable
 */
export default Cmp => {

  class ValidateOnblur extends PureComponent {
    static defaultProps = {
      onBlur : x=>x,
    }

    onBlur = e=>{
      const {onBlur} = this.props
      this.refs.inner.checkValidity()
      onBlur(e)
    }

    render() {
      const {onBlur} = this
      return <Cmp {...this.props} ref='inner' onBlur={onBlur}/>
    }
  }

  return ValidateOnblur
}
