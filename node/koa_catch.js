/*
 * 一个简单的koa错误处理中间件
 * 一般作为koa的第一个中间件，也就是最外层，这样可最大限度地扩展捕获错误的范围
 *
 * 注：koa_logger已经包含本中间件的所有功能，建议不再使用本库
 */
import 'colors'
import {tostr} from '../modash.js'

export const koa_catch = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error(tostr(err).white.bgRed)
    ctx.status = 500
    ctx.body = err
  }
}
