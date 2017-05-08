/*
 * koa一个打日志的小中间件
 */

const log = require('debug')('utils:koa_logger')
const debug = require('debug')('debug:utils:koa_logger')

export async function logger(ctx, next) { 
  log(`<<<<<<<<<<<<< ${(ctx.method + ' ' + ctx.url).green} ${ctx.request.ip} <<<<<<<<<<<<<`)
  debug(ctx.headers)

  await next()

  log(`>>>>>>>>>>>>> ${(ctx.status + '')[ctx.status === 200 ? 'green' : 'red']} >>>>>>>>>>>>>`)
  debug(ctx.body)
}

