// 提供一些常用的React组件编写的工具
import _ from 'lodash'

export function merge_props(p0, p1){ // 两个props合并，主要是针对style再合并一层

  const style = (x=>{
    if ( !p0 || !p1 || !p0.style || !p1.style ) {
      return null
    } 

    return {
      style : {
        ...p0.style,
        ...p1.style,
      }
    }
  })()

  return {
    ...p0,
    ...p1,
    ...style,
  }
}

export function merge_props_with_def_style(def_style, p){ // 返回新的props

  if ( !_.isObject(def_style) ) {
    return p
  }

  const st = p.style ? {
    style : {
      ...def_style,
      ...p.style,
    },
  } : { style : def_style }

  return {
    ...p,
    ...st,
  }
}

