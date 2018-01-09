/*
 * 尝试实现一个能Flex的img
 */
import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  cmain : {
  }
})
export default class FlexImg extends PureComponent {
  render() {
    const {src, style, ...rest} = this.props

    const props = {
      style : {
        backgroundImage : `url(${src})`,
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
        backgroundPosition : 'center center',
        ...style,
      },
      ...rest,
    }
    return <div {...props}/>
  }
}
