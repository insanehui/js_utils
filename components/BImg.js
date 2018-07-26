/*
 * 用backgroundImage机制来实现的img，可以解决常规img的一些不足，比如
 * > 没有浏览器的拖动缺省行为
 * > 支持css标准的contain, cover
 */
import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import domAttrs from '../react-dom-attrs/index.js'

@injectSheet({
  cmain : {
    backgroundRepeat : 'no-repeat',
  }
})
export default class BImg extends PureComponent {
  render() {
    const {src, style, className = '', 
      /*
       * 当cover为true时，会保持原图的比例裁剪并覆盖
       */
      cover,
      contain,
      x = 'center', y = 'center',
      classes : {cmain},
      ...rest} = this.props

    let background
    if ( cover ) {
      background = {
        backgroundSize : 'cover',
      }
    } 
    else if ( contain ) {
      background = {
        backgroundSize : 'contain',
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
        backgroundPosition : `${x} ${y}`,
        ...background,
        ...style,
      },
      ...domAttrs(rest),
    }
    return <div {...props}/>
  }
}
