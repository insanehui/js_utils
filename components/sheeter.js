/*
 * 用jss的方式给一个组件注入样式
 * 相较于styler，可以解决一些hover等样式问题
 */
import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

export default style => (Cmp='div') => {

  @injectSheet({
    cmain : style,
  })
  class Sheeter extends PureComponent {
    render() {
      const {classes:{cmain}, className, ...rest} = this.props
      return <Cmp className={`${cmain} ${className}`} {...rest} />
    }
  }
  return Sheeter
}

