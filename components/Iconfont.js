import React from 'react'

export default p=>{
  const {children, className, style, size, ...rest} = p
  return <i {...rest} style={{...(size && {fontSize:size})}} className={`iconfont icon-${children} ${className || ''}`} />
}
