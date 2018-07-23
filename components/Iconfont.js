import React from 'react'

// iconfont的icon
export const Icon = p=>{
  const {children, className, style, size, ...rest} = p
  return <i {...rest} style={{...(size && {fontSize:size})}} className={`iconfont icon-${children} ${className || ''}`} />
}
