// 用js来表示css的方法

import jss from "jss";
import preset from 'jss-preset-default'
import _ from 'lodash'

jss.setup(preset())

export function css(obj){
  let sheet = jss.createStyleSheet(obj).attach();
  return sheet.classes;
}

export function border(color = "black") {
  return {
    border: "1px solid " + color,
  }
}
Object.assign(border, border())

export function flex(...v) { 
  let r = {}

  for (let i of v) {
    if ( _.isNumber(i) ) { // 表示这是一个 children
      r.flex = i
    } else { // 这是一个container

      // TODO: 后面扩展更多符号，可以选的符号有：< > ^ v <|> >|< << >> <^ <-|> 后续好好研究一下它们的意义
      r.display = "flex"

      if ( i === '><' ) { // 居中布局
        r.justifyContent = "center"
        r.alignItems =  "center"
      }
    }
  }

  return r
}

Object.assign(flex, { // 对象用于flex容器
  display: "flex"
})

export const ptr = {
  cursor:"pointer",
}

export function bg(v) {
  return {
    background: v,
  }
}    

export function hsl(h, s, l, a){
  // 例：hsl(121, 48, 65) 将可得到 "hsl(121, 48%, 65%)"
  if( typeof(a) === "undefined" )
  {
    return "hsl(" + h + "," + s + "%, " + l + "%)";
  }
  else
  {
    return "hsla(" + h + "," + s + "%, " + l + "%, " + a + ")";
  }
}

// 计算size
export function sz(w, h){
  let r = {}
  if( !_.isNull(w) ) {
    r.width = w
  }
  if ( !_.isNull(h) ) {
    if ( _.isUndefined(h) ) {
      r.height = w
    } else {
      r.height = h
    }
  }  
  return r
}

// height
export function h(v){
  return {
    height: v,
  }
}


export default { css, border, flex, ptr, bg, hsl, sz, h }
