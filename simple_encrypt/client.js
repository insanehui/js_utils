/*
 * koa插件配套的客户端方法
 */
import {decode} from './encrypt.js'
import {res_xkey, req_xkey, req_xval} from './koa.js'
import _ from 'lodash'
import {fromjson} from '../modash.js'

export const cheat = fetch_fn => async (...para) => {
  _.set(para, `1.headers.${req_xkey}`, req_xval)
  return fetch_fn(...para)
}

export const decrypt = fetch_fn => async (...para) => { // fetch的装饰器

  // eslint-disable-next-line
  para; // 这是babel的bug，经试验，若省略这一行的话，会出现诡异的错误

  const res = await fetch_fn(...para)
  let txt = await res.text()
  if ( res.headers.has(res_xkey) ) {
    txt = decode(txt)
  } 
  return {
    ...res,
    text : ()=>txt, 
    json : ()=>fromjson(txt),
  }
}

/*
 * [deprecated] 以下ketch相关的代码后续不再使用
 */
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
