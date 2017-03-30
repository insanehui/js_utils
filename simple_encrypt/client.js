/*
 * koa插件配套的客户端方法
 */
import {decode} from './encrypt.js'
import {res_xkey, req_xkey, req_xval} from './koa.js'
import _ from 'lodash'

// import form_encode from 'form-urlencoded'
// export async function get(url, para) {
//   const full_url = url + '?' + form_encode(para)

//   let req = fetch
//   if( process ){
//     req = require('node-fetch')
//   }

//   const xtxt = await req(full_url, {
//     method : 'GET', 
//   }).then(res => res.text())

//   const txt = decode(xtxt)
//   return JSON.parse(txt)
// }

export async function ketch_(res){ // ketch后件，输出res.Data


  let txt = await res.text()
  if ( res.headers.has(res_xkey) ) {
    txt = decode(txt)
  } 
  res.Data = txt
  return res
}

export function _ketch(...para){ // ketch前件，使用了之后，将可开启传输不加密
  _.set(para, `1.headers.${req_xkey}`, req_xval)
  return para
}
