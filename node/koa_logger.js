/*
 * koa一个打日志的小中间件
 * 完全包含koa_catch的功能
 */

import 'colors'
const log = require('debug')('utils:koa_logger')
const debug = require('debug')('debug:utils:koa_logger')

import {count} from '../counter.js' // 计数器，用来统计会话
import {tostr} from '../modash.js'

// 会话id的背景色表，字体色固定为白色
// 没有黄色是因为黄底白字看不清
const color_table = ['bgRed', 'bgGreen', 'bgBlue', 'bgMagenta', 'bgCyan'] 

export async function logger(ctx, next) { 
  let id = count()
  id = ctx.state.id = (`[${id}]`).white[color_table[ id % color_table.length]]

  try {
    // 给会话编个号

    log(`${id} <<<<<<<<<<<<< ${(ctx.method + ' ' + ctx.url).green} ${ctx.request.ip} <<<<<<<<<<<<<`)
    debug(ctx.headers)

    await next()

  } catch(err) {
    ctx.status = 500
    ctx.body = err
  }

  const ok = ctx.status === 200

  log(`${id} >>>>>>>>>>>>> ${(ctx.status + '')[ok ? 'green' : 'red']} >>>>>>>>>>>>>`)

  if ( ok ) {
    debug(ctx.body)
  } else {
    // 前面预留两个空格主要是为了跟debug打的日志对齐
    console.error(`  ${`${'ERROR'} ${tostr(ctx.body)}`.white.bgRed} ${id}`) 
  }
}

