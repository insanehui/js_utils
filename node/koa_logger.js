/*
 * koa一个打日志的小中间件
 */
const debug = require('debug')('koa_logger')

export async function logger(ctx, next) { 
  debug(`${ctx.method} ${ctx.url}`);
  await next();
}

