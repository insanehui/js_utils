/*
 * koa一个打日志的小中间件
 */

const log = require('debug')('utils:koa_logger')
const debug = require('debug')('debug:utils:koa_logger')
import {count} from '../counter.js' // 计数器，用来统计会话

export async function logger(ctx, next) { 
  // 给会话编个号
  const id = ctx.state.id = count()

  log(`[${id}] <<<<<<<<<<<<< ${(ctx.method + ' ' + ctx.url).green} ${ctx.request.ip} <<<<<<<<<<<<<`)
  debug(ctx.headers)

  await next()

  log(`[${id}] >>>>>>>>>>>>> ${(ctx.status + '')[ctx.status === 200 ? 'green' : 'red']} >>>>>>>>>>>>>`)
  debug(ctx.body)
}

