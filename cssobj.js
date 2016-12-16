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

export function flex(v) { // 函数用于flex children
  let r = {}

  if ( _.isNumber(v) ) {
    r.flex = v
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

export default { css, border, flex, ptr, bg, hsl, sz }
