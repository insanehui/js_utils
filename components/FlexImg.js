/*
 * 尝试实现一个能Flex的img
 */
import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  cmain : {
    backgroundSize : 'cover',
    backgroundRepeat : 'no-repeat',
    backgroundPosition : 'center center',
  }
})
export default class FlexImg extends PureComponent {
  render() {
    const {src, style, className, 
      classes : {cmain},
      ...rest} = this.props

    const props = {
      className : `${cmain} ${className}`,
      style : {
        backgroundImage : `url(${src})`,
        ...style,
      },
      ...rest,
    }
    return <div {...props}/>
  }
}
