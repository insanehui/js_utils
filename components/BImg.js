/*
 * 用backgroundImage机制来实现的img，可以解决常规img的一些不足，比如
 * > 没有浏览器的拖动缺省行为
 * > 可以不失真比例覆盖
 */
import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

@injectSheet({
  cmain : {
    backgroundRepeat : 'no-repeat',
  }
})
export default class BImg extends PureComponent {
  render() {
    const {src, style, className, 
      /*
       * 当noflex为true时，会保持原图的比例裁剪并覆盖
       */
      noflex,
      contain,
      classes : {cmain},
      ...rest} = this.props

    let background
    if ( noflex ) {
      background = {
        backgroundSize : 'cover',
        backgroundPosition : 'center center',
      }
    } 
    else if ( contain ) {
      background = {
        backgroundSize : 'contain',
        backgroundPosition : 'center center',
      }
    } 
    else { // 默认情况
      background = {
        backgroundSize: '100% 100%',
      }
    }

    const props = {
      className : `${cmain} ${className}`,
      style : {
        backgroundImage : `url(${src})`,
        ...background,
        ...style,
      },
      ...rest,
    }
    return <div {...props}/>
  }
}
