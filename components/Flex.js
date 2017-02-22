// Flex布局相关的组件
import React from 'react'
import {merge_props_with_def_style as merge_st} from './utils.js'

const S = (x=>{

  const flex = {
    display : 'flex',
  }

  const h = {
    ...flex,
    flexDirection: 'row',
  }

  const v = {
    ...flex,
    flexDirection: 'column',
  }

  return {
    flex, h, v,
  }

})()

export function Flex(p){ // TODO: 可以考虑增加一些 wrap等属性，更方便配置flex的一些行为
  return <div {...merge_st(S.flex, p)}/>
}

export function H(p){
  return <div {...merge_st(S.h, p)}/>
}

export function V(p){
  return <div {...merge_st(S.v, p)}/>
}
