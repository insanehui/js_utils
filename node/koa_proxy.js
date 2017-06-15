/*
 * 重新写一个proxy
 * 先把一些东西写死看看
 */
const http = require('http')
const Url = require('url')

const streamToPromise = require('stream-to-promise')

import _ from 'lodash'

const _log = require('debug')('utils:koa_proxy');
const _debug = require('debug')('debug:utils:koa_proxy');

export const proxy = url => async (ctx, next)=>{ // 不封口的版本

  const [log, debug] = (function(){
    const x = ctx.state.logger
    const log = x ? x(_log) : _log
    const debug = x ? x(_debug) : _debug
    return [log, debug]
  })()

  debug("req header", JSON.stringify(ctx.headers, null, '  '))

  const dest_url = Url.parse(url)

  var opt = { 
    ...dest_url,
    path : dest_url.path + (ctx.querystring ? '?' + ctx.querystring : ''),
    method: ctx.method,
    /*
     * 去掉accept：因为小郎的服务器不支持传统的浏览器默认添加的accept，故去掉
     */
    headers : _.omit(ctx.headers, 'accept-encoding', 'host', 'accept'),
  }

  log(`-> ${url}`)
  debug('req opt: ', opt)

  let res_buf = '' // 缓存结果内容

  const req = http.request(opt, (res) => {
    log(`<- ${url} res code: ${res.statusCode}`)
    debug(`res header: ${JSON.stringify(res.headers, null, '  ')}`)

    // 透传返回码以及headers
    ctx.status = res.statusCode
    /*
     * content-length和transfer-encoding都要去掉，否则两者会打架
     */
    ctx.set(_.omit(res.headers, 'content-length', 'transfer-encoding'))
  })

  ctx.req.pipe(req)

  await new Promise(resolve=>{
    req.on('response', (response) => {
      response.on('data', data=>{
        res_buf += data
        debug(`response get data: ${data.length}`)
      })

      response.on('end', ()=>{
        debug(`response end`)
        resolve()
      })

    })
  })

  await streamToPromise(ctx.req) // 这里传入req也是可以的

  ctx.body = res_buf

  await next() // 意味着proxy是一个彻底的前置件
}

