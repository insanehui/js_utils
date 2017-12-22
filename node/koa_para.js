/*
 * 将koa-body解析出来的结果与ctx.query对象，进行合并
 * 从而实现统一处理post和get（query string）请求里的参数
 * 输出 ctx.para
 */
import koaBody from 'koa-body'
const _log = require('debug')('utils:koa_para')

// multipart设为true以支持文件上传
const koa_body = koaBody({ multipart: true })

export async function para(ctx, next) {

  ctx.para = ctx.query

  /*
   * 注意这里对接中间件的方式：
   * 将koa-body的next参数传入一个自写的函数
   * 在该函数里使用其处理的结果，并且接上原本的next
   */
  await koa_body(ctx, async ()=>{
    ctx.para = { ...ctx.para, ...ctx.request.body }

    const x = ctx.state.logger
    const log = x ? x(_log) : _log

    log(ctx.para)
    await next()
  })
}

