/*
 * 基于simple_encrypt的一个koa中间件
 */
import {encode} from './encrypt.js'
import uuid from 'uuid/v1' 

export const req_xkey = 'x-warcraft'
export const req_xval = 'greedisgood'

export const res_xkey = 'x-cloudtogo-web' // 返回的头，表示已加密。值可以为任意值，仅用来混淆视听:)

const _log = require('debug')('utils:simple_encrypt')

export async function simple_encrypt(ctx, next) {

  if ( ctx.header[req_xkey] !== req_xval ) { // 当请求的http头包含了暗号，则不加密
    // 采用加密逻辑
    // 设置加密头
    ctx.set(res_xkey, uuid().replace(/-/g,''))
    ctx.body = encode(ctx.body)
  } 

  await next()
}

/*
 * 于2017年5月2日重写simple_encrypt: 主要将加密的内容放在尾端
 */
export async function koa(ctx, next){
  const [log] = (function(){
    const x = ctx.state.logger
    const log = x ? x(_log) : _log
    return [log]
  })()

  await next() 

  if ( ctx.header[req_xkey] !== req_xval ) { // 仅当请求的http头未包含了暗号，则加密
    // 设置加密头
    ctx.set(res_xkey, uuid().replace(/-/g,''))
    ctx.body = encode(ctx.body)
    log('set body encrypted')
  }
}
