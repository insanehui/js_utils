/*
 * koa一个打日志的小中间件
 */
const debug = require('debug')('koa_logger')

export async function logger(ctx, next) { 
  await next();
  debug(`${ctx.method} ${ctx.url}`);
}

