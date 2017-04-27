/*
 * koa一个打日志的小中间件
 */

const debug = require('debug')('utils:koa_logger')
const log_header = require('debug')('utils:koa_logger:header')

export async function logger(ctx, next) { 
  debug(`${ctx.method} ${ctx.url}`)
  log_header(ctx.headers)
  await next();
}

