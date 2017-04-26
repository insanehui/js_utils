/*
 * 重新写一个proxy
 * 先把一些东西写死看看
 */
const http = require('http')
const Url = require('url')

const streamToPromise = require('stream-to-promise')

import _ from 'lodash'

const debug = require('debug')('koa_proxy');

export const proxy = url => async (ctx, next)=>{ // 主要先实现能将post请求传递

  debug("req header", JSON.stringify(ctx.headers, null, '  '))

  var opt = { 

    // hostname: 'mart.cloudtogo.cn',
    // path: '/app/list',
    // port : 80,

    // hostname: 'localhost',
    // path: '/bar',
    // port : 8084,

    // hostname: 'composer.dev.cloudtogo.cn',
    // path: '/get_blueprint',
    // port : 8084,

    ...Url.parse(url),
    method: ctx.method,
    headers : _.omit(ctx.headers, 'accept-encoding', 'host', ),
  }

  const req = http.request(opt, (res) => {
    debug(`res code: ${res.statusCode}`)
    debug(`res header: ${JSON.stringify(res.headers)}`)

    // 透传返回码以及headers
    ctx.status = res.statusCode

    ctx.set(res.headers)
  })

  req.on('response', (response) => {
    response.pipe(ctx.res)
  })

  ctx.req.pipe(req)

  // req和res都要promise化才能正常工作
  await streamToPromise(ctx.req) // 这里传入req也是可以的
  await streamToPromise(ctx.res) 
}

