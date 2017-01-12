// 用js来表示css的方法
// 这里也一定程序地作为css知识点的笔记总结

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

      // TODO: 这种方式后来发现也不好用，后续摸索更好的使用方法
      // 后面扩展更多符号，可以选的符号有：< > ^ v <|> >|< << >> <^ <-|> 后续好好研究一下它们的意义
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

// height
export function w(v){
  return {
    width: v,
  }
}

// 实现滚动条的属性
export const scroll = {
  // overflow还有其他属性
  // visible：缺省。溢出照样显示
  // scroll：表示始终显示滚动条
  // auto：智能显示滚动条
  // hidden：将溢出的隐藏，并不提供滚动条
  overflow: 'auto', // !不能与display:flex混用，会导致界面错乱
}

// inline-block
export const inblock = {
  display: 'inline-block',
}

// pre，令div也有类似pre的行为
export const pre = {
  whiteSpace : 'pre'
}

export default { css, border, flex, ptr, bg, hsl, sz, h, w, scroll,
  pre, inblock,
}
