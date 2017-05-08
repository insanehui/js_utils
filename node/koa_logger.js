/*
 * koa一个打日志的小中间件
 * 完全包含koa_catch的功能
 */

import 'colors'
const log = require('debug')('utils:koa_logger')
const debug = require('debug')('debug:utils:koa_logger')

import {count} from '../counter.js' // 计数器，用来统计会话
import {tostr} from '../modash.js'

export async function logger(ctx, next) { 
  const id = ctx.state.id = count()

  try {
    // 给会话编个号

    log(`[${id}] <<<<<<<<<<<<< ${(ctx.method + ' ' + ctx.url).green} ${ctx.request.ip} <<<<<<<<<<<<<`)
    debug(ctx.headers)

    await next()

  } catch(err) {
    ctx.status = 500
    ctx.body = err
  }

  const ok = ctx.status === 200

  log(`[${id}] >>>>>>>>>>>>> ${(ctx.status + '')[ok ? 'green' : 'red']} >>>>>>>>>>>>>`)

  if ( ok ) {
    debug(ctx.body)
  } else {
    console.error(`  ${`${'ERROR'} [${id}] ${tostr(ctx.body)}`.white.bgRed}`)
  }
}

