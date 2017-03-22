/*
 * koa插件配套的客户端方法
 */
import form_encode from 'form-urlencoded'
import {decode} from './encrypt.js'

export async function get(url, para) {
  const full_url = url + '?' + form_encode(para)

  let req = fetch
  if( process ){
    req = require('node-fetch')
  }

  const xtxt = await req(full_url, {
    method : 'GET', 
  }).then(res => res.text())

  const txt = decode(xtxt)
  return JSON.parse(txt)
}

export async function foa_(res){ // fetchoa后件
  const xtxt = await res.text()
  const txt = decode(xtxt)
  console.log("txt", txt)
  res.Data = txt
  return res
}
