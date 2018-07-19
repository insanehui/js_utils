/*
 * 用jss的方式给一个组件注入样式
 * 相较于styler，可以解决一些hover等样式问题. 
 * > forward ref
 */
import React, { forwardRef } from 'react'
import {css} from '../cssobj.js'
import name from '../components/displayName/hoc.js'

// import injectSheet from 'react-jss'

// export default style => (Cmp='div') => {

//   @injectSheet({
//     cmain : style,
//   })
//   class Sheeter extends PureComponent {
//     render() {
//       const {classes:{cmain}, sheet, className, xRef, ...rest} = this.props
//       let cls = className ? ' '+className : ''
//       return <Cmp className={`${cmain}${cls}`} {...rest} ref={xRef} />
//     }
//   }

//   return forwardRef((props, ref)=><Sheeter {...props} xRef={ref} />)
// }

export default style => (Cmp='div') => {

  const c = css({
    style,
  })

  function hoc(props, ref) {
    const {className} = props
    let cls = className ? ' '+className : ''
    return <Cmp {...props} className={`${c.style}${cls}`} ref={ref} />
  }
  hoc.displayName = name(Cmp, 'sheeter')

  return forwardRef(hoc)

}

